<?php

namespace App;

use Doctrine\ORM\EntityManagerInterface;

class BaseApiService {
    protected EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }
}