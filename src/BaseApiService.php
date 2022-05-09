<?php

namespace App;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Contracts\Service\Attribute\Required;
use Symfony\Contracts\Service\ServiceSubscriberInterface;

class BaseApiService
{
    protected EntityManagerInterface $em;
    protected int $userId;

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
}