<?php
namespace App\MessageHandler;

use App\Message\FeedCreate;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class FeedCreateHandler
{
    public function __invoke(FeedCreate $message)
    {
        // ... do some work - like sending an SMS message!
    }
}