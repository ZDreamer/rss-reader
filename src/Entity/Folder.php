<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Dto\FolderInputPatch;
use App\Dto\FolderInputPost;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    collectionOperations: [
        'get_tree' => [
            'method' => 'GET',
            'path' => '/folders/get_tree',
        ],
        'post' => [
            'input' => FolderInputPost::class,
            'output' => false,
        ],
    ],
    itemOperations: [
        'patch' => [
            'input' => FolderInputPatch::class,
            'output' => false,
        ],
        'delete',
    ]
)]
class Folder
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private $title;

    #[ORM\Column(type: 'datetime')]
    private $createdAt;

    #[ORM\Column(type: 'datetime')]
    private $updatedAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $owner;

    #[ORM\ManyToOne(targetEntity: self::class)]
    private $parent;

    #[ORM\Column(
        type: 'boolean',
        options: ['default' => true]
    )]
    private $isOpened = true;

    #[ORM\PrePersist]
    public function setCreatedAtValue()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    #[ORM\PreUpdate]
    public function setUpdatedAtValue()
    {
        $this->updatedAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setParent(?Folder $parent): self
    {
        //TODO: Проверить что родитель принадлежит тому-же User
        $this->parent = $parent;

        return $this;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getIsOpened(): ?bool
    {
        return $this->isOpened;
    }

    public function setIsOpened(bool $isOpened): self
    {
        $this->isOpened = $isOpened;

        return $this;
    }
}
