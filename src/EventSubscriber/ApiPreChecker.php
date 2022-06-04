<?php
namespace App\EventSubscriber;

use ApiPlatform\Core\Action\PlaceholderAction;
use App\Controller\ApiAbstractController;
use App\Controller\ApiFeedController;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Security;

class ApiPreChecker implements EventSubscriberInterface
{
    private Security $security;
    private EntityManagerInterface $em;

    public function __construct(Security $security, EntityManagerInterface $entityManager)
    {
        $this->security = $security;
        $this->em = $entityManager;
    }

    public function onKernelController(ControllerEvent $event)
    {
        $controller = $event->getController();

        if ($controller instanceof PlaceholderAction) {
            return true;
        }

        if (!$controller[0] instanceof ApiAbstractController) {
            return true;
        }

        if (!$this->security->isGranted('ROLE_USER')) {
            return new AccessDeniedException('Access Denied, please log in.');
        }

        $id = $event->getRequest()->attributes->get('id');
        if ($id) {
            $entity = $this->em->find($controller[0]->apiEntityClass, $id);

            if ($entity->getOwner() != $this->security->getUser()) {
                return new AccessDeniedException('Access Denied, entity belongs to another user.');
            }

            $controller[0]->setApiEntity($entity);
        }

        return true;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}