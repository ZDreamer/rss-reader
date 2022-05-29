<?php
namespace App\MessageHandler;

use App\Entity\FeedSource;
use App\Message\FeedSourceInit;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\Service\Attribute\Required;

#[AsMessageHandler]
class FeedSourceInitHandler extends AbstractAsyncMessageHandler
{
    protected HttpClientInterface $httpClient;

    #[Required]
    public function setHttpClient(HttpClientInterface  $httpClient): void
    {
        $this->httpClient = $httpClient;
    }

    public function __invoke(FeedSourceInit $message)
    {
        $pageUrl = $message->getContent();
        $this->log('URL:' . $pageUrl);

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

        if ($rssLink = $this->findRssLinkInPage($content, $pageUrl)) {
            $this->log('Page type: RSS');
            $this->log('RSS feed: ' . $rssLink);
        } else {
            $this->log('Page type: unknown');
        }
    }

    /*
     * https://www.rssboard.org/rss-autodiscovery
     */
    private function findRssLinkInPage($pageHtml, $pageUrl) {
        preg_match_all('/<link\s+(.*?)\s*\/?>/si', $pageHtml, $m);
        $rawLinks = $m[1];

        $links = [];
        foreach($rawLinks as $rawLink) {
            $link = [];
            $attributes = preg_split('/\s+/s', $rawLink);
            foreach ($attributes as $attribute) {
                $attributeArray = preg_split('/\s*=\s*/s', $attribute, 2);
                if (isset($attributeArray[1])) {
                    $attributeArray[1] = preg_replace('/([\'"]?)(.*)\1/', '$2', $attributeArray[1]);
                    $link[strtolower($attributeArray[0])] = strtolower($attributeArray[1]);
                }
            }
            $links[] = $link;
        }

        foreach ($links as $link) {
            if (
                !isset($link['rel']) || $link['rel'] != 'alternate' ||

                !isset($link['type']) ||
                ($link['type'] != 'application/rss+xml' && $link['type'] != 'text/xml') ||

                !isset($link['href'])
            ) continue;

            if (str_contains($link['href'], "http://") || str_contains($link['href'], "https://")) {
                return $link['href'];
            } else {
                $urlParts = parse_url($pageUrl);
                $this->log($urlParts);

                $fullUrl = $urlParts['scheme'] . "://" . $urlParts['host'];
                if (isset($urlParts['port'])) {
                    $fullUrl .= ":" . $urlParts['port'];
                }

                if ($link['href'][0] != '/') { #it's a relative link on the domain
                    $fullUrl .= dirname($urlParts['path']);
                    if (!str_ends_with($fullUrl, '/')) {
                        $fullUrl .= '/';
                    }
                }

                $fullUrl .= $link['href'];

                return $fullUrl;
            }
        }

        return false;
    }
}