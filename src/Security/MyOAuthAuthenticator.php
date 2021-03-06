<?php
namespace App\Security;

use App\Entity\Folder;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Security\Authenticator\OAuth2Authenticator;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class MyOAuthAuthenticator extends OAuth2Authenticator
{
    private $clientRegistry;
    private $entityManager;
    private $router;

    public function __construct(ClientRegistry $clientRegistry, EntityManagerInterface $entityManager, RouterInterface $router)
    {
        $this->clientRegistry = $clientRegistry;
        $this->entityManager = $entityManager;
        $this->router = $router;
    }

    public function supports(Request $request): ?bool
    {
        // continue ONLY if the current ROUTE matches the check ROUTE
        return $request->attributes->get('_route') === 'connect_yandex_check';
    }

    public function authenticate(Request $request): Passport
    {
        /** @var \KnpU\OAuth2ClientBundle\Client\Provider\YandexClient $client */
        $client = $this->clientRegistry->getClient('yandex_main'); //TODO: Добавить ещё способов авторизации
        $accessToken = $this->fetchAccessToken($client);

        return new SelfValidatingPassport(
            new UserBadge($accessToken->getToken(), function() use ($accessToken, $client) {
                $oAuthUser = $client->fetchUserFromToken($accessToken);

                $email = $oAuthUser->getEmail();

                // 1) have they logged in with Facebook before? Easy!
                $existingUser = $this->entityManager->getRepository(User::class)->findOneBy([
                    'yandexId' => $oAuthUser->getId()
                ]);

                if ($existingUser) {
                    return $existingUser;
                }

                // 2) do we have a matching user by email?
                $user = $this->entityManager->getRepository(User::class)->findOneBy([
                    'email' => $email,
                ]);

                if (!$user) {
                    $user = new User();
                    $user->setEmail($email);
                    $user->setPassword('');

                    $rootFolder = new Folder();
                    $rootFolder->setTitle('All');
                    $rootFolder->setOwner($user);

                    $this->entityManager->persist($rootFolder);
                }

                $user->setYandexId($oAuthUser->getId());
                $this->entityManager->persist($user);
                $this->entityManager->flush();

                return $user;
            })
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // change "app_homepage" to some route in your app
        $targetUrl = $this->router->generate('app_homepage');

        return new RedirectResponse($targetUrl);

        // or, on success, let the request continue to be handled by the controller
        //return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $message = strtr($exception->getMessageKey(), $exception->getMessageData());

        return new Response($message, Response::HTTP_FORBIDDEN);
    }
}