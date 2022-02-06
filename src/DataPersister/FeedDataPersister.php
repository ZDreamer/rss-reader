<?php
namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Feed;
use Doctrine\ORM\EntityManagerInterface;

final class FeedDataPersister implements ContextAwareDataPersisterInterface
{
    private $em;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Feed;
    }

    public function persist($data, array $context = [])
    {
        $this->em->persist($data);
        $this->em->flush();

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
        $this->em->remove($data);
        $this->em->flush();
    }
}
