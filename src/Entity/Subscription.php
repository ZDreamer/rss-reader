<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SubscriptionRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: SubscriptionRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    collectionOperations: [
        'post' => [
            'denormalization_context' => ['groups' => ['save', 'create']],
        ],
    ],
    itemOperations: [
        'patch' => [
            'denormalization_context' => ['groups' => ['save', 'edit']],
        ],
        'delete',
    ]
)]
//cascade: ["persist", "remove"]
class Subscription
{
    public function __construct()
    {
        $this->tags = new ArrayCollection();
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 1024)]
    #[Assert\NotBlank]
    #[Groups(["save"])]
    private ?string $title;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank]
    #[Groups(["create"])]
    private ?string $url;

    #[ORM\Column(type: 'datetime')]
    private ?DateTimeInterface $createdAt;

    #[ORM\Column(type: 'datetime')]
    private ?DateTimeInterface $updatedAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $owner;

    #[ORM\OneToMany(mappedBy: 'subscription', targetEntity: SubscriptionFolder::class)]
    private $folders;

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
}
