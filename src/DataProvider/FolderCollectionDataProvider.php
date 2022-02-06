<?php
namespace App\DataProvider;

use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\Folder;
use App\Entity\Feed;
use Doctrine\ORM\EntityManagerInterface;

final class FolderCollectionDataProvider implements ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface
{
    private $em;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return Folder::class === $resourceClass;
    }

    public function getCollection(string $resourceClass, string $operationName = null, array $context = []): array
    {
        if ($operationName == 'get_tree') {
            return $this->getTree();
        } else {
            throw new \Exception('Unknown operation ' . $operationName);
        }
    }

    private function getTree()
    {
        $userId = 1; //TODO: Тут надо брать реального пользователя

        $feeds = $this->em->createQuery("
            SELECT
                s.id,
                s.title,
                s.url
            FROM App\Entity\Feed s
            WHERE s.owner = :user_id
            ORDER BY s.id ASC
        ")->setParameters(['user_id' => $userId])->getArrayResult();

        $folders = $this->em->createQuery("
            SELECT
                f.id,
                f.title,
                f.isOpened,
                COALESCE(IDENTITY(f.parent), 0) AS parent
            FROM App\Entity\Folder f
            WHERE f.owner = :user_id
            ORDER BY f.id ASC
        ")->setParameters(['user_id' => $userId])->getArrayResult(); //TODO: сортировку через интерфейс

        return [
            'feeds' => $feeds,
            'folders' => $folders,
        ];
    }
}