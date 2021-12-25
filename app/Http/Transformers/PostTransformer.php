<?php

namespace App\Http\Transformers;

use App\Models\Post;

class PostTransformer
{
    public static function toInstance(array $input, $post = null)
    {
        if (empty($post)) {
            $post = new Post();
        }

        foreach ($input as $key => $value) {
            switch ($key) {
                case 'title':
                    $post->title = $value;
                    break;
                case 'body':
                    $post->body = $value;
                    break;
            }
        }

        return $post;
    }
}
