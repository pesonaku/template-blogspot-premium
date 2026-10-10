<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\License;
use Illuminate\Support\Str;
use Carbon\Carbon;

class LicenseController extends Controller
{
    /**
     * Verifikasi lisensi domain dari template Blogspot
     * Endpoint: POST /api/verify-license
     */
    public function verify(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'license_key' => 'required|string',
            'domain'      => 'required|string',
        ]);

        $licenseKey = trim($validated['license_key']);
        $rawDomain  = trim($validated['domain']);
        $domain     = License::normalizeDomain($rawDomain);

        // Cari data lisensi berdasarkan license_key
        $license = License::where('license_key', $licenseKey)->first();

        if (!$license) {
            return response()->json([
                'valid'   => false,
                'message' => 'Kode lisensi tidak terdaftar dalam sistem.',
            ], 404)->withHeaders($this->corsHeaders());
        }

        // Cek status lisensi
        if ($license->status === 'suspended') {
            return response()->json([
                'valid'   => false,
                'message' => 'Lisensi ini telah dinonaktifkan / disuspend oleh administrator.',
            ], 403)->withHeaders($this->corsHeaders());
        }

        if ($license->status === 'expired' || ($license->expires_at && Carbon::now()->greaterThan($license->expires_at))) {
            return response()->json([
                'valid'   => false,
                'message' => 'Masa berlaku lisensi telah habis.',
            ], 403)->withHeaders($this->corsHeaders());
        }

        // Cek domain yang didaftarkan
        $registeredDomain = License::normalizeDomain($license->registered_domain);
        if ($domain !== $registeredDomain) {
            return response()->json([
                'valid'             => false,
                'message'           => 'Domain tidak cocok dengan lisensi yang didaftarkan.',
                'registered_domain' => $license->registered_domain,
                'requested_domain'  => $rawDomain,
            ], 403)->withHeaders($this->corsHeaders());
        }

        // Lisensi valid
        return response()->json([
            'valid'        => true,
            'message'      => 'Lisensi aktif dan terverifikasi.',
            'client_name'  => $license->client_name,
            'domain'       => $license->registered_domain,
            'expires_at'   => $license->expires_at ? $license->expires_at->toIso8601String() : null,
        ], 200)->withHeaders($this->corsHeaders());
    }

    /**
     * Mendaftarkan / membuat lisensi baru
     * Endpoint: POST /api/licenses
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'registered_domain' => 'required|string',
            'client_name'       => 'required|string|max:255',
            'client_email'      => 'nullable|email|max:255',
            'duration_months'   => 'nullable|integer|min:1',
        ]);

        $licenseKey = 'PREM-' . strtoupper(Str::random(4)) . '-' . strtoupper(Str::random(4)) . '-' . strtoupper(Str::random(4));
        $normalizedDomain = License::normalizeDomain($validated['registered_domain']);

        $expiresAt = null;
        if (!empty($validated['duration_months'])) {
            $expiresAt = Carbon::now()->addMonths((int)$validated['duration_months']);
        }

        $license = License::create([
            'license_key'       => $licenseKey,
            'registered_domain' => $normalizedDomain,
            'client_name'       => $validated['client_name'],
            'client_email'      => $validated['client_email'] ?? null,
            'status'            => 'active',
            'expires_at'        => $expiresAt,
        ]);

        return response()->json([
            'success' => true,
            'data'    => $license,
        ], 201)->withHeaders($this->corsHeaders());
    }

    /**
     * Response CORS Headers agar request dari Blogspot diizinkan
     */
    private function corsHeaders(): array
    {
        return [
            'Access-Control-Allow-Origin'  => '*',
            'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Accept, Authorization',
        ];
    }
}
