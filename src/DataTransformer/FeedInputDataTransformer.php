<?php

namespace App\DataTransformer;

use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use App\BaseApiService;
use App\Dto\FeedInput;
use App\Entity\Feed;
use App\Entity\FeedFolder;
use App\Entity\FeedSource;
use App\Entity\Folder;
use App\Entity\User;
use App\Message\FeedSourceInit;
use Symfony\Component\Messenger\MessageBusInterface;

class FeedInputDataTransformer extends BaseApiService implements DataTransformerInterface
{
    public function transform($object, string $to, array $context = []): Feed
    {
        if ($context['operation_type'] === 'collection' && $context['collection_operation_name'] === 'post') {
            $feed = new Feed();
            $feed->setOwner(
                $this->em->find(User::class, $this->userId)
            );
        } else {
            $feed = $context['object_to_populate'];
        }

        $isNew = !$feed->getId();

        if ($isNew) {
            $feedSourceData = $this->getOrCreateFeedSource($object);

            $feed->setTitle($feedSourceData['title']);
            $feed->setSource($feedSourceData['object']);
        } elseif ($object->title !== null) {
            $feed->setTitle($object->title);
        }

        $alienFolders = $this->em->createQuery("
            SELECT f.id
            FROM App\Entity\Folder f
            WHERE f.id IN (:folderIds) AND f.owner != :owner
        ")->setParameters(['folderIds' => $object->folders, 'owner' => $this->userId])->getArrayResult();
        if ($alienFolders) {
            throw new \Exception('Some folders belong to other user');
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

    private function getOrCreateFeedSource($object) {
        $urlProcessor = new \App\Service\UrlProcessor;

        $fullUrl = $urlProcessor->toFullUrl($object->url);

        $feedSource = $this->em->getRepository(FeedSource::class)->findOneBy([
           'url' =>  $fullUrl,
        ]);

        if ($feedSource) {
            if ($feedSource->getState() == FeedSource::STATE_INACTIVE) {
                $feedSource->setState(FeedSource::STATE_NEW);
            }
        } else {
            $feedSource = new FeedSource();
            $feedSource->setUrl($fullUrl);
            $feedSource->setState(FeedSource::STATE_NEW);
        }

        if ($feedSource->getState() == FeedSource::STATE_NEW) {
            $this->bus->dispatch(new FeedSourceInit($fullUrl));
        }

        return [
            'title' => $urlProcessor->toUrlTitle($object->url),
            'object' => $feedSource,
        ];
    }

    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        return ($context['input']['class'] === FeedInput::class);
    }
}