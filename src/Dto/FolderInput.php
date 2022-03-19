<?php

namespace App\Dto;

class FolderInput
{
    public ?string $title = null;

    public ?int $parent = null;

    public ?bool $isOpened = null;
}