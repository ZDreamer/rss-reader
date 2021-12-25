<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    public function tags()
    {
        return $this->belongsToMany(
            SubscriptionTag::class,
            'subscription_to_tag',
            'subscription_id',
            'tag_id'
        )->withTimestamps();
    }
}
