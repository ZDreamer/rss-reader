<?php

namespace App\Dto;

class FeedInput
{
    public ?string $title = null;

    public ?string $url = null;

    public ?array $folders = [];
}