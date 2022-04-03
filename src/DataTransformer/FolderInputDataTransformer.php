<?php

namespace App\DataTransformer;

use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use App\BaseApiService;
use App\Dto\FolderInput;
use App\Entity\Folder;
use App\Entity\User;

class FolderInputDataTransformer extends BaseApiService implements DataTransformerInterface
{
    public function transform($object, string $to, array $context = []): Folder
    {
        if ($context['operation_type'] === 'collection' && $context['collection_operation_name'] === 'post') {
            $folder = new Folder();
            $folder->setOwner(
                $this->em->find(User::class, $this->userId)
            );
        } else {
            $folder = $context['object_to_populate'];
        }

        if ($object->title !== null) {
            $folder->setTitle($object->title);
        }

        if ($object->isOpened !== null) {
            $folder->setIsOpened($object->isOpened);
        }

        if (!$object->parent) {
            throw new \Exception('Folder must have a parent');
        }
        $parentFolder = $this->em->find(Folder::class, $object->parent);
        if ($parentFolder->getOwner()->getId() != $this->userId) {
            throw new \Exception('Parent folder must not belong to other user');
        }

        $folder->setParent($parentFolder);

        return $folder;
    }

    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        return ($context['input']['class'] === FolderInput::class);
    }
}