<?php
namespace App\Service\FeedProcessor;

use Psr\Log\LoggerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class RssProcessor
{
    protected HttpClientInterface $httpClient;
    protected LoggerInterface $log;

    public function __construct(HttpClientInterface  $httpClient, LoggerInterface $log)
    {
        $this->httpClient = $httpClient;
        $this->log = $log;
    }

    /*
         * https://www.rssboard.org/rss-autodiscovery
         */
    public function findRssLinkInPage($pageHtml, $pageUrl) {
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

    public function processRssSource($feedSource, $o) {
        $this->log->info('Page type: RSS');
        $this->log->info('RSS feed: ' . $o['feedUrl']);
        $this->log->info('$o', $o);

        //TODO: Посылать адрес сайта и email в UserAgent
        $feed = $this->httpClient->request('GET', $o['feedUrl']);

        $this->log->info("Feed content:\n" . $feed->getContent());
    }
}