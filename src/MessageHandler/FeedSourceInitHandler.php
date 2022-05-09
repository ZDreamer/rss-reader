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
        $fullUrl = $message->getContent();
        $this->log('URL:' . $fullUrl);

        $feedSource = $this->em->getRepository(FeedSource::class)->findOneBy([
            'url' =>  $fullUrl,
        ]);

        $response = $this->httpClient->request(
            'GET',
            $fullUrl
        );

        $this->log('response');
        $this->log($response->toArray());
    }
}