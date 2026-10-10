<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class License extends Model
{
    use HasFactory;

    protected $fillable = [
        'license_key',
        'registered_domain',
        'client_name',
        'client_email',
        'status',
        'expires_at',
        'notes',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    /**
     * Normalisasi string domain
     */
    public static function normalizeDomain(?string $domain): string
    {
        if (!$domain) {
            return '';
        }
        $domain = trim($domain);
        $domain = preg_replace('#^https?://#i', '', $domain);
        $domain = preg_replace('#^www\.#i', '', $domain);
        $domain = explode('/', $domain)[0];
        $domain = explode(':', $domain)[0];
        return strtolower($domain);
    }

    /**
     * Memeriksa apakah lisensi valid untuk domain tertentu
     */
    public function isValidForDomain(string $domain): bool
    {
        $normalizedInput = self::normalizeDomain($domain);
        $normalizedRegistered = self::normalizeDomain($this->registered_domain);

        if ($this->status !== 'active') {
            return false;
        }

        if ($this->expires_at && Carbon::now()->greaterThan($this->expires_at)) {
            return false;
        }

        // Domain cocok atau subdomain blogspot wildcard
        return $normalizedInput === $normalizedRegistered;
    }
}
