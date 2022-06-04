<?php
namespace App\Controller;
use App\Entity\Feed;
use App\EntityService\Feed\FeedService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class ApiFeedController extends ApiAbstractController
{
    public string $apiEntityClass = Feed::class;

    #[Route('/api/feed/{id}/reload', name: 'feed_reload')]
    public function reloadAction(FeedService $feedService): Response
    {
        $feedService->reload($this->apiEntity);

        return $this->json([]);
    }
}