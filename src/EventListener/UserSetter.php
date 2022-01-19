<?php
namespace App\EventListener;

use App\Entity\Subscription;
use App\Entity\SubscriptionTag;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\Event\LifecycleEventArgs;

//Вероятно лучше заменить на EventSubscriber
//https://symfony.com/doc/current/event_dispatcher.html#creating-an-event-subscriber
class UserSetter
{
    // the listener methods receive an argument which gives you access to
    // both the entity object of the event and the entity manager itself
    public function prePersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof Subscription && !$entity instanceof SubscriptionTag) {
            return;
        }

        $entityManager = $args->getObjectManager();

        $entity->setOwner(
            $entityManager->find(User::class, 1)
        );
    }
}