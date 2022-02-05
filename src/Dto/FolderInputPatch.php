<?php

namespace App\Dto;

class FolderInputPatch
{
    public ?string $title = null;

    public ?int $parent = null;

    public ?bool $isOpened = null;
}