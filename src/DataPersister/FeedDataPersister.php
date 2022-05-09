<?php
namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\BaseApiService;
use App\Entity\Feed;
use App\EntityService\Feed\FeedService;

final class FeedDataPersister extends BaseApiService implements ContextAwareDataPersisterInterface
{
    protected FeedService $feedService;

    public function __construct(FeedService $feedService)
    {
        $this->feedService = $feedService;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Feed;
    }

    public function persist($data, array $context = [])
    {
        $this->em->persist($data);
        $this->em->flush();

//        if (
//            $data instanceof User && (
//                ($context['collection_operation_name'] ?? null) === 'post' ||
//                ($context['graphql_operation_name'] ?? null) === 'create'
//            )
//        ) {
//            $this->sendWelcomeEmail($data);
//        }
    }

    public function remove($data, array $context = [])
    {
        $this->feedService->remove($data);
    }
}
