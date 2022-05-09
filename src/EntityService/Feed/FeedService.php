<?php

namespace App\EntityService\Feed;

use App\BaseApiService;
use App\Entity\Feed;
use App\Entity\FeedSource;

class FeedService extends BaseApiService
{
    public function remove(Feed $feed) {
        $source = $feed->getSource();

        $this->em->remove($feed);
        $this->em->flush();

        $sourceFeed = $this->em->getRepository(Feed::class)->findOneBy([
            'source' =>  $source,
        ]);

        if (!$sourceFeed) {
            if ($source->getState() == FeedSource::STATE_NEW) {
                $this->em->remove($source);
            } else {
                $source->setState(FeedSource::STATE_INACTIVE);
                $this->em->persist($source);
            }

            $this->em->flush();
        }
    }
}