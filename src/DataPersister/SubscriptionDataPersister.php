<?php
namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Subscription;
use Doctrine\ORM\EntityManagerInterface;

final class SubscriptionDataPersister implements ContextAwareDataPersisterInterface
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Subscription;
    }

    public function persist($data, array $context = [])
    {
        dump($data);

        $this->entityManager->persist($data);
        $this->entityManager->flush();

//        if (
//            $data instanceof User && (
//                ($context['collection_operation_name'] ?? null) === 'post' ||
//                ($context['graphql_operation_name'] ?? null) === 'create'
//            )
//        ) {
//            $this->sendWelcomeEmail($data);
//        }
    }

    public function remove($data, array $context = [])
    {
        $this->entityManager->remove($data);
        $this->entityManager->flush();
    }
}
