<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_create_an_employee() {

        // make an instance of the Employee Factory
        $post = Post::factory()->make();

        // post the data to the employees store method
        $response = $this->post(route('post.store'), [
            'title' => $post->title,
            'body' => $post->body,
        ]);

        $response->assertSuccessful();

        $this->assertDatabaseHas('posts', [
            'name' => $post->title,
            'body' => $post->body,
        ]);

    }
}
