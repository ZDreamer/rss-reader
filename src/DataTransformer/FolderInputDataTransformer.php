<?php

namespace App\DataTransformer;

use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use App\BaseApiService;
use App\Dto\FolderInput;
use App\Entity\Folder;

class FolderInputDataTransformer extends BaseApiService implements DataTransformerInterface
{
    public function transform($object, string $to, array $context = []): Folder
    {
        if ($context['operation_type'] === 'collection' && $context['collection_operation_name'] === 'post') {
            $folder = new Folder();
        } else {
            $folder = $context['object_to_populate'];
        }

        if ($object->title !== null) {
            $folder->setTitle($object->title);
        }

        if ($object->isOpened !== null) {
            $folder->setIsOpened($object->isOpened);
        }

        $folder->setParent(
            $this->em->find(Folder::class, $object->parent)
        );

        return $folder;
    }

    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        return ($context['input']['class'] === FolderInput::class);
    }
}