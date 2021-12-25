<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Http\Requests\UpdateSubscriptionRequest;
use App\Http\Resources\SubscriptionResource;
use App\Http\Transformers\SubscriptionTransformer;
use App\Models\Subscription;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        return SubscriptionResource::collection(
            Subscription::simplePaginate($request->input('page') ?? 10)
        )->additional([
            'meta' => [
                'success' => true,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSubscriptionRequest  $request
     * @return SubscriptionResource
     */
    public function store(StoreSubscriptionRequest $request)
    {
        DB::beginTransaction();
        try {
            $obj = SubscriptionTransformer::toInstance($request->all());
            $obj->save();
            DB::commit();
        } catch (Exception $ex) {
            Log::info($ex->getMessage());
            DB::rollBack();
            return response()->json($ex->getMessage(), 409);
        }

        return (new SubscriptionResource($obj))
            ->additional([
                'meta' => [
                    'success' => true,
                    'message' => "employee created"
                ]
            ]);
    }

    public function show(Subscription $subscription): SubscriptionResource
    {
        return (new SubscriptionResource($subscription))
            ->additional([
                'meta' => [
                    'success' => true,
                ]
            ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSubscriptionRequest  $request
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSubscriptionRequest $request, Subscription $subscription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subscription $subscription)
    {
        //
    }
}
