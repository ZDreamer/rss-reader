<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use DateTimeInterface;
//TODO: The mappings App\Entity\Feed#feedFolders and App\Entity\FeedFolder#feed are inconsistent with each other.
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

    public function getFeed(): ?Feed
    {
        return $this->feed;
    }

    public function setFeed(?Feed $feed): self
    {
        $this->feed = $feed;
        return $this;
    }

    public function setFolder(?Folder $folder): self
    {
        $this->folder = $folder;
        return $this;
    }
}