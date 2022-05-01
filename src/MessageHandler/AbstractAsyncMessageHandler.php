<?php
namespace App\MessageHandler;

use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

abstract class AbstractAsyncMessageHandler
{
    protected EntityManagerInterface $em;
    protected LoggerInterface $log;

    public function __construct(EntityManagerInterface $entityManager, LoggerInterface $messengerLogger)
    {
        $this->em = $entityManager;
        $this->log = $messengerLogger;
    }

    protected function log($message) {
        if (is_array($message)) {
            $message = var_export($message, true);
        }

        $this->log->info($message);
    }
}