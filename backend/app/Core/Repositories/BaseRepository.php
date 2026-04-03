<?php

namespace App\Core\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

/**
 * Base Repository Pattern Implementation
 * Provides common CRUD operations for all repositories
 */
abstract class BaseRepository
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all records
     */
    public function all(array $columns = ['*']): Collection
    {
        return $this->model->select($columns)->get();
    }

    /**
     * Find record by ID
     */
    public function findById(int $id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * Find record by attribute
     */
    public function findBy(string $attribute, $value): ?Model
    {
        return $this->model->where($attribute, $value)->first();
    }

    /**
     * Find multiple records by attribute
     */
    public function findAllBy(string $attribute, $value): Collection
    {
        return $this->model->where($attribute, $value)->get();
    }

    /**
     * Create a new record
     */
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    /**
     * Update a record
     */
    public function update(int $id, array $data): bool
    {
        return $this->model->find($id)?->update($data) ?? false;
    }

    /**
     * Delete a record
     */
    public function delete(int $id): bool
    {
        return $this->model->destroy($id) > 0;
    }

    /**
     * Paginate records
     */
    public function paginate(int $limit = 15)
    {
        return $this->model->paginate($limit);
    }

    /**
     * Get total count
     */
    public function count(): int
    {
        return $this->model->count();
    }

    /**
     * Check if record exists
     */
    public function exists(int $id): bool
    {
        return $this->model->where('id', $id)->exists();
    }

    /**
     * Get query builder instance
     */
    public function query()
    {
        return $this->model->query();
    }

    /**
     * Soft delete a record (if using SoftDeletes trait)
     */
    public function softDelete(int $id): bool
    {
        return $this->model->find($id)?->delete() ?? false;
    }

    /**
     * Restore a soft-deleted record
     */
    public function restore(int $id): bool
    {
        return $this->model->withTrashed()->find($id)?->restore() ?? false;
    }

    /**
     * Force delete a record permanently
     */
    public function forceDelete(int $id): bool
    {
        return $this->model->withTrashed()->where('id', $id)->forceDelete() > 0;
    }
}
