<?php

namespace App\DataTransformer;

use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use App\BaseApiService;
use App\Dto\FeedInput;
use App\Entity\Feed;
use App\Entity\FeedFolder;
use App\Entity\Folder;

class FeedInputDataTransformer extends BaseApiService implements DataTransformerInterface
{
    public function transform($object, string $to, array $context = []): Feed
    {
        if ($context['operation_type'] === 'collection' && $context['collection_operation_name'] === 'post') {
            $feed = new Feed();
        } else {
            $feed = $context['object_to_populate'];
        }

        $isNew = !$feed->getId();

        if ($isNew) {
            $feed->setUrl($object->url);
        }

        if ($isNew) {
            $feed->setTitle($object->url);
        } elseif ($object->title !== null) {
            $feed->setTitle($object->title);
        }

        $idIndex = [];
        if ($isNew) {
            $toAdd = $object->folders;
            $toRemove = [];
        } else {
            $feedFolders = $this->em->createQuery("
                SELECT
                    ff.id,
                    COALESCE(IDENTITY(ff.folder), 0) AS folder_id
                FROM App\Entity\FeedFolder ff
                WHERE ff.feed = :feed_id
            ")->setParameters(['feed_id' => $feed->getId()])->getArrayResult();

            foreach ($feedFolders as $item) {
                $idIndex[$item['folder_id']] = $item['id'];
            }

            $newFolderIds = array_column($feedFolders, 'folder_id');

            $toAdd = array_diff($object->folders, $newFolderIds);
            $toRemove = array_diff($newFolderIds, $object->folders);
        }

        //dump(['toAdd' => $toAdd, 'toRemove' => $toRemove, '$idIndex' => $idIndex]);

        //TODO: Надо разобраться как в persister такие вещи делать
        foreach ($toAdd as $folderId) {
            $feedFolder = new FeedFolder();
            $folder = $this->em->find(Folder::class, $folderId);
            $feedFolder->setFolder($folder);
            $feed->addFeedFolder($feedFolder);
        }

        foreach ($toRemove as $folderId) {
            $feedFolder = $this->em->find(FeedFolder::class, $idIndex[$folderId]);

            $this->em->remove($feedFolder);
        }

        return $feed;
    }

    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        return ($context['input']['class'] === FeedInput::class);
    }
}