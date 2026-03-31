<?php

namespace App\Core\Services;

use Illuminate\Support\Facades\Log;
use Exception;

/**
 * Base Service Class
 * Provides common business logic operations and error handling
 */
abstract class BaseService
{
    protected $repository;

    /**
     * Handle exceptions and log them
     */
    protected function handleException(Exception $e, string $context = '')
    {
        Log::error("Service Error [{$context}]: " . $e->getMessage(), [
            'trace' => $e->getTraceAsString(),
        ]);

        throw $e;
    }

    /**
     * Log successful operation
     */
    protected function logSuccess(string $action, array $data = [])
    {
        Log::info("Action: {$action}", $data);
    }

    /**
     * Validate data before processing
     */
    protected function validate(array $data, array $rules)
    {
        $validator = app('validator')->make($data, $rules);

        if ($validator->fails()) {
            throw new Exception('Validation failed: ' . implode(', ', $validator->errors()->all()));
        }

        return $validator->validated();
    }

    /**
     * Begin a database transaction
     */
    public function beginTransaction()
    {
        return app('db')->beginTransaction();
    }

    /**
     * Commit a database transaction
     */
    public function commit()
    {
        return app('db')->commit();
    }

    /**
     * Rollback a database transaction
     */
    public function rollback()
    {
        return app('db')->rollBack();
    }

    /**
     * Execute operation within a transaction
     */
    public function executeInTransaction(callable $callback)
    {
        try {
            $this->beginTransaction();
            $result = $callback();
            $this->commit();
            return $result;
        } catch (Exception $e) {
            $this->rollback();
            throw $e;
        }
    }

    /**
     * Cache a value
     */
    protected function cache(string $key, callable $callback, int $minutes = 60)
    {
        return cache()->remember($key, now()->addMinutes($minutes), $callback);
    }

    /**
     * Forget cached value
     */
    protected function forgetCache(string $key)
    {
        cache()->forget($key);
    }
}
