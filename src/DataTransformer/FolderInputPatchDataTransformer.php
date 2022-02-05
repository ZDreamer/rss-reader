<?php

namespace App\DataTransformer;

use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use App\Dto\FolderInputPatch;
use App\Entity\Folder;
use Doctrine\ORM\EntityManagerInterface;

class FolderInputPatchDataTransformer implements DataTransformerInterface
{
    private $em;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    public function transform($object, string $to, array $context = []): Folder
    {
        $folder = $context['object_to_populate'];

        if ($object->isOpened !== null) {
            $folder->setIsOpened($object->isOpened);
        }

        return $folder;
    }

    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        return (
            ($context['operation_type'] === 'item') &&
            ($context['item_operation_name'] === 'patch') &&
            ($context['input']['class'] === FolderInputPatch::class) &&
            ($to === Folder::class)
        );
    }
}