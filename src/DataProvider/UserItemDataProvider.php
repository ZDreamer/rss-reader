<?php
namespace App\DataProvider;

use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

final class UserItemDataProvider implements ItemDataProviderInterface, RestrictedDataProviderInterface
{
    private $em;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return User::class === $resourceClass;
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        if ($operationName == 'get_subscription_tree') {
            return $this->getSubscriptionTree($id);
        } else {
            throw new \Exception('Unknown operation ' . $operationName);
        }
    }

    private function getSubscriptionTree($userId)
    {
        $subscriptions = $this->em->createQuery("
            SELECT
                s.id,
                s.title,
                s.url
            FROM App\Entity\Subscription s
            WHERE s.owner = :user_id
        ")->setParameters(['user_id' => $userId])->getArrayResult();

        $folders = $this->em->createQuery("
            SELECT
                f.id,
                f.title,
                f.isOpened,
                COALESCE(IDENTITY(f.parent), 0) AS parent
            FROM App\Entity\Folder f
            WHERE f.owner = :user_id
        ")->setParameters(['user_id' => $userId])->getArrayResult();

        return [
            'subscriptions' => $subscriptions,
            'folders' => $folders,
        ];
    }
}