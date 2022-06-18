<?php
namespace App\Service;

use Psr\Log\LoggerInterface;

class Logger
{
    protected LoggerInterface $logger;

    public function __construct(LoggerInterface $messengerLogger)
    {
        $this->logger = $messengerLogger;
    }

    public function log($message) {
        if (is_array($message)) {
            $message = var_export($message, true);
            $message = preg_replace("/=>\\s*array\\s*\\(/sm", "=> array(", $message);
        }

        $this->logger->info($message);
    }
}