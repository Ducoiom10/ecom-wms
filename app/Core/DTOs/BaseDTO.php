<?php

namespace App\Core\DTOs;

/**
 * Base Data Transfer Object
 * Used for transferring data between layers with type safety and validation
 */
abstract class BaseDTO
{
    /**
     * Convert DTO to array format
     */
    public function toArray(): array
    {
        $data = [];
        foreach (get_object_vars($this) as $key => $value) {
            if ($value instanceof self) {
                $data[$key] = $value->toArray();
            } elseif (is_array($value)) {
                $data[$key] = $this->arrayToArray($value);
            } else {
                $data[$key] = $value;
            }
        }
        return $data;
    }

    /**
     * Convert array of DTOs or values to array
     */
    private function arrayToArray(array $arr): array
    {
        return array_map(function ($item) {
            if ($item instanceof self) {
                return $item->toArray();
            }
            return $item;
        }, $arr);
    }

    /**
     * Create DTO from array
     */
    public static function fromArray(array $data): static
    {
        return new static(...$data);
    }

    /**
     * Convert DTO to JSON
     */
    public function toJson(): string
    {
        return json_encode($this->toArray());
    }
}
