<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LicenseController;

/*
|--------------------------------------------------------------------------
| API Routes for Blogspot Template Licensing Server
|--------------------------------------------------------------------------
*/

// Endpoint validasi lisensi untuk template Blogspot (React Frontend)
Route::post('/verify-license', [LicenseController::class, 'verify']);

// Options route handler untuk preflight CORS browser
Route::options('/verify-license', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
});

// Endpoint administrasi untuk membuat lisensi baru
Route::post('/licenses', [LicenseController::class, 'store']);
