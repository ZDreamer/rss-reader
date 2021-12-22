<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*

https://laravel.com/docs/8.x/socialite - authorisation with networks

https://laravel.com/docs/8.x/fortify - authorisation

https://dev.to/siddhartha/api-authentication-via-social-networks-in-laravel-8-using-sanctum-with-socialite-36pa

https://dev.to/seankerwin/laravel-8-rest-api-with-resource-controllers-5bok - tests
 */

Route::get('/{path?}', function () {
//    $post = \App\Models\Post::create([
//        'title' => 'Статья 2',
//        'body' => '
//            Ku! Ku!!! Ku.u!Ku! Ku!!! Ku.KU.KU.ku.KUKUKU.ku.ku! Ku! Ku!!! Ku.KU.ku.KUu!Ku! Ku!!! Ku.KU.KUKU.
//            ku.ku! Ku! Ku!!! Ku.KU.ku.KUKUKU.ku.ku!
//            Ku! Ku!!! Kuu!Ku! Ku!!! Ku.KU..KU.ku.KUKUKU.ku.ku!u!Ku! Ku!!! Ku.KU.Ku! Ku!!! Ku.KU.ku.u!Ku!]
//             Ku!!! Ku.KU.UKUKU.ku.ku!ku.KUKUKU.ku.ku! Ku! Ku!!! Ku.KU.ku.KUKUKU.ku.ku! Ku! Ku!!! Ku.KU.ku.
//             KUKUKU.ku.ku!
//            Ku! Ku!!! Ku.KU.ku.KUKUu!Ku! Ku!!! Ku.KU.KU.ku.ku!Ku! Ku!!u!Ku! Ku!!! Ku.KU.u!Ku! Ku!!! Ku.KU.
//            u!Ku! Ku!!! Ku.KU.
//        ',
//    ]);
//
//    return $user;

//    dump(\App\Models\User::all());
//
//    dump(\App\Models\User::find(1));



    return view('index');
})->where('path', '.*')->name('react');
