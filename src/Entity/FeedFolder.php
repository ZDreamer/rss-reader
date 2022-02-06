<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use DateTimeInterface;

#[ORM\Entity()]
#[ORM\Table(name: '`feed_folder`')]
#[ORM\HasLifecycleCallbacks]
class FeedFolder
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Feed::class, inversedBy: "folders")]
    #[ORM\JoinColumn(nullable: false)]
    private $feed;

    #[ORM\ManyToOne(targetEntity: Folder::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $folder;

    #[ORM\Column(type: 'datetime')]
    private ?DateTimeInterface $createdAt;

    #[ORM\Column(type: 'datetime')]
    private ?DateTimeInterface $updatedAt;

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
}