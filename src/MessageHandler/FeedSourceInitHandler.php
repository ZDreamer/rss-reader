<?php
namespace App\MessageHandler;

use App\BaseApiService;
use App\Message\FeedSourceInit;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class FeedSourceInitHandler extends AbstractAsyncMessageHandler
{
    public function __invoke(FeedSourceInit $message)
    {
        $this->log('URL2:' . $message->getContent());
    }
}