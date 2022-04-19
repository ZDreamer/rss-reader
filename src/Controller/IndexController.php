<?php
namespace App\Controller;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class IndexController extends AbstractController
{
    #[Route(
        '/{reactRouting}',
        name: 'app_homepage',
        requirements: [
            'reactRouting' => '^(?!api|connect).+'
        ],
        defaults: [
            'reactRouting' => null
        ]
    )]
    public function indexAction(Security $security): Response
    {
        if ($security->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->render('index.html.twig', []);
        } else {
            return $this->render('indexAuth.html.twig', []);
        }
    }

    #[Route('/connect/yandex', name: 'connect_yandex')]
    public function connectAction(ClientRegistry $clientRegistry)
    {
        return $clientRegistry->getClient('yandex_main')->redirect();
    }

    #[Route('/connect/yandex/check', name: 'connect_yandex_check')]
    public function connectCheckAction()
    {
    }

    #[Route('/logout', name: 'app_logout')]
    public function logoutAction()
    {
    }
}
