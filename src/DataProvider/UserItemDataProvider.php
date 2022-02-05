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
        if (false) {

        } else {
            throw new \Exception('Unknown operation ' . $operationName);
        }
    }
}