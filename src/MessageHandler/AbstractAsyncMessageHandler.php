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
    public function setUserId(LoggerInterface $messengerLogger): void
    {
        $this->log = $messengerLogger;

        $formatter = new LineFormatter(
            null, // Format of message in log, default [%datetime%] %channel%.%level_name%: %message% %context% %extra%\n
            null, // Datetime format
            true, // allowInlineLineBreaks option, default false
            true  // ignoreEmptyContextAndExtra option, default false
        );
    }

    protected function log($message) {
        if (is_array($message)) {
            $message = var_export($message, true);
            $message = preg_replace("/=>\\s*array\\s*\\(/sm", "=> array(", $message);
        }

        $this->log->info($message);
    }
}