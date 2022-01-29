<?php

namespace App\DataTransformer;

use ApiPlatform\Core\DataTransformer\DataTransformerInterface;
use App\Dto\FolderInputPost;
use App\Entity\Folder;
use Doctrine\ORM\EntityManagerInterface;

class FolderInputPostDataTransformer implements DataTransformerInterface
{
    private $em;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    public function transform($object, string $to, array $context = []): Folder
    {
        $folder = new Folder();

        $folder->setTitle($object->title);

        $folder->setParent(
            $this->em->find(Folder::class, $object->parent)
        );

        return $folder;
    }

    public function supportsTransformation($data, string $to, array $context = []): bool
    {
        return (
            ($context['operation_type'] === 'collection') &&
            ($context['collection_operation_name'] === 'post') &&
            ($context['input']['class'] === FolderInputPost::class) &&
            ($to === Folder::class)
        );
    }
}