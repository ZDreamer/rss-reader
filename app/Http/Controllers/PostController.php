<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Http\Transformers\PostTransformer;
use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Validator;

class PostController extends Controller
{
    public function index(Request $request)
    {
        return PostResource::collection(
            Post::simplePaginate($request->input('page') ?? 15)
        )->additional([
            'meta' => [
                'success' => true,
                'message' => "post loaded",
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'body' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toArray(), 422);
        }

        DB::beginTransaction();
        try {
            $post = PostTransformer::toInstance($validator->validate());
            $post->save();
            DB::commit();
        } catch (Exception $ex) {
            Log::info($ex->getMessage());
            DB::rollBack();
            return response()->json($ex->getMessage(), 409);
        }

        return (new PostResource($post))
            ->additional([
                'meta' => [
                    'success' => true,
                    'message' => "employee created"
                ]
            ]);
    }

    public function show(Post $post): PostResource
    {
        return (new PostResource($post))
            ->additional([
                'meta' => [
                    'success' => true,
                    'message' => "post found"
                ]
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    public function update(Request $request, Post $post)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string',
            'body' => 'sometimes|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toArray(), 422);
        }

        DB::beginTransaction();
        try {
            $updated_post = PostTransformer::toInstance($validator->validate(), $post);
            $updated_post->save();
            DB::commit();
        } catch (Exception $ex) {
            Log::info($ex->getMessage());
            DB::rollBack();
            return response()->json($ex->getMessage(), 409);
        }

        return (new PostResource($updated_post))
            ->additional([
                'meta' => [
                    'success' => true,
                    'message' => "post updated"
                ]
            ]);
    }

    public function destroy(Post $post)
    {
        DB::beginTransaction();
        try {
            $post->delete();
            $post->active = false;
            $post->save();
            DB::commit();
        } catch (Exception $ex) {
            Log::info($ex->getMessage());
            DB::rollBack();
            return response()->json($ex->getMessage(), 409);
        }

        return response()->json('post has been deleted', 204);

    }
}
