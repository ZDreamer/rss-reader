<?php
namespace App\MessageHandler;

use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Contracts\Service\Attribute\Required;
use Monolog\Formatter\LineFormatter;

abstract class AbstractAsyncMessageHandler
{
    protected EntityManagerInterface $em;
    protected LoggerInterface $log;

    #[Required]
    public function setEntityManager(EntityManagerInterface $entityManager): void
    {
        $this->em = $entityManager;
    }

    #[Required]
    public function setLogger(LoggerInterface $messengerLogger): void
    {
        $this->log = $messengerLogger;
    }
}