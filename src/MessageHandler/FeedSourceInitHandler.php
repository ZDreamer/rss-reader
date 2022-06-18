<?php
namespace App\MessageHandler;

use App\Entity\FeedSource;
use App\Message\FeedSourceInit;
use App\Service\FeedProcessor\RssProcessor;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Contracts\HttpClient\HttpClientInterface;


#[AsMessageHandler]
class FeedSourceInitHandler extends AbstractAsyncMessageHandler
{
    protected HttpClientInterface $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    public function __invoke(FeedSourceInit $message)
    {
        $pageUrl = $message->getContent();
        $this->log->info('URL:' . $pageUrl);

        $feedSource = $this->em->getRepository(FeedSource::class)->findOneBy([
            'url' =>  $pageUrl,
        ]);

        $response = $this->httpClient->request('GET', $pageUrl);

        /*
         * 1) Понять тип источника. То-ли это RSS, то-ли Web-Archive, то-ли twitter, то-ли ещё что.
         * 1.1) API WebArchive https://archive.org/services/docs/api/index.html
         * 2) Скачать заголовок и иконку
         * 3) В зависимости от типа источника к нему применимы следующие операции
         * 3.1) Начальное получение новых статей
         * 3.2) Проверка и обновление на новые статьи
         * 3.3) Получение более старых статей
         * 3.4) Получение статуса, сколько скачено уже, до какой даты
         */

        $content = $response->getContent();

        $rssProcessor = new RssProcessor($this->httpClient, $this->log);
        if ($rssFeedUrl = $rssProcessor->findRssLinkInPage($content, $pageUrl)) {
            $rssProcessor->processRssSource($feedSource, [
                'feedUrl' => $rssFeedUrl,
            ]);
            return;
        }

        $this->log->error('Page type: unknown');
    }
}