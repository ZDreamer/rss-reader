<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Dto\FeedInput;
use App\Dto\FeedInputPost;
use App\Repository\FeedRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: FeedRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    collectionOperations: [
        'post' => [
            'input' => FeedInput::class,
            'output' => false,
        ],
    ],
    itemOperations: [
        'patch' => [
            'input' => FeedInput::class,
            'output' => false,
        ],
        'delete',
    ]
)]
//cascade: ["persist", "remove"]
class Feed
{
    public function __construct()
    {
        $this->feedFolders = new ArrayCollection();
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 1024)]
    #[Assert\NotBlank]
    private ?string $title;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank]
    private ?string $url;

    #[ORM\Column(type: 'datetime')]
    private ?DateTimeInterface $createdAt;

    #[ORM\Column(type: 'datetime')]
    private ?DateTimeInterface $updatedAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $owner;

    #[ORM\OneToMany(mappedBy: 'feed', targetEntity: FeedFolder::class, cascade: ["persist", "remove"])]
    private $feedFolders;

    public function getId(): ?int
    {
        return $this->id;
    }

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

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function addFeedFolder(FeedFolder $feedFolder): self
    {
        if (!$this->feedFolders->contains($feedFolder)) {
            $this->feedFolders[] = $feedFolder;
            $feedFolder->setFeed($this);
        }
        return $this;
    }
}
