<?php
namespace App\DataProvider;

use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\BaseApiService;
use App\Entity\Folder;

final class FolderCollectionDataProvider extends BaseApiService implements ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface
{
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
        $feeds = $this->em->createQuery("
            SELECT
                s.id,
                s.title,
                s.url
            FROM App\Entity\Feed s
            WHERE s.owner = :user_id
            ORDER BY s.id ASC
        ")->setParameters(['user_id' => $this->userId])->getArrayResult();

        $folders = $this->em->createQuery("
            SELECT
                f.id,
                f.title,
                f.isOpened,
                COALESCE(IDENTITY(f.parent), 0) AS parent
            FROM App\Entity\Folder f
            WHERE f.owner = :user_id
            ORDER BY f.id ASC
        ")->setParameters(['user_id' => $this->userId])->getArrayResult(); //TODO: сортировку через интерфейс

        $feedFolders = $this->em->createQuery("
            SELECT
                ff.id,
                COALESCE(IDENTITY(ff.feed), 0) AS feed_id,
                COALESCE(IDENTITY(ff.folder), 0) AS folder_id
            FROM App\Entity\Feed f
            JOIN f.feedFolders ff
            WHERE f.owner = :user_id
        ")->setParameters(['user_id' => $this->userId])->getArrayResult();

        return [
            'feeds' => $feeds,
            'folders' => $folders,
            'feedFolders' => $feedFolders,
        ];
    }
}