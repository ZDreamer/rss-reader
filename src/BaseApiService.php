<?php

namespace App;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class BaseApiService {
    protected EntityManagerInterface $em;
    protected int $userId;

    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->em = $entityManager;
        $this->userId = $security->getUser()->getId();
    }
}