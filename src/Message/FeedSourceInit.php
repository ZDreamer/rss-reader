<?php
namespace App\Message;

/*
 * На продашкене:
 *    php bin/console messenger:consume async -vv - сами воркеры
 *    php bin/console messenger:stop-workers - при деплое
 *
 * symfony run -d --watch=config,src,templates,vendor symfony console messenger:consume async -vv
 */

class FeedSourceInit extends AbstractAsyncMessage
{
    private $content;

    public function __construct(string $content)
    {
        $this->content = $content;
    }

    public function getContent(): string
    {
        return $this->content;
    }
}