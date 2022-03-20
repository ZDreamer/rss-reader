<?php
namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\BaseApiService;
use App\Entity\Folder;

final class FolderDataPersister extends BaseApiService implements ContextAwareDataPersisterInterface
{
    public function supports($data, array $context = []): bool
    {
        return $data instanceof Folder;
    }

    public function persist($data, array $context = [])
    {
        $this->em->persist($data);
        $this->em->flush();
    }

    public function remove($data, array $context = [])
    {
        dump($data);

        //todo: Rearrange FeedFolders for feeds in this folder

        $feedFolders = $this->em->createQuery("
            SELECT
                ff.id,
                COALESCE(IDENTITY(ff.folder), 0) AS folder_id,
                COALESCE(IDENTITY(ff.feed), 0) AS feed_id
            FROM App\Entity\FeedFolder ff
            WHERE ff.owner = :owner_id
        ")->setParameters(['owner_id' => $data->owner])->getArrayResult();

        $this->em->remove($data);
        $this->em->flush();
    }
}
