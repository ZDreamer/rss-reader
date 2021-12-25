<?php

namespace App\Http\Transformers;

use App\Models\Post;
use App\Models\Subscription;

class SubscriptionTransformer
{
    public static function toInstance(array $input, $obj = null)
    {
        if (empty($obj)) {
            $obj = new Subscription();
        }

        foreach ($input as $key => $value) {
            switch ($key) {
                case 'title':
                    $obj->title = $value;
                    break;
                case 'url':
                    $obj->url = $value;
                    break;
            }
        }

        $obj->user_id = 0;

        return $obj;
    }
}
