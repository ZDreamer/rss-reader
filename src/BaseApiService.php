<?php

namespace App;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Contracts\Service\Attribute\Required;

class BaseApiService
{
    protected EntityManagerInterface $em;
    protected int $userId;
    protected MessageBusInterface $bus;

    #[Required]
    public function setEntityManager(EntityManagerInterface $entityManager): void
    {
        $this->em = $entityManager;
    }

    #[Required]
    public function setUserId(Security $security): void
    {
        $this->userId = $security->getUser()->getId();
    }

    #[Required]
    public function setBus(MessageBusInterface $bus): void
    {
        $this->bus = $bus;
    }
}