<?php

namespace Modules\Catalog\Actions;

use Modules\Catalog\Models\Product;

class CreateProduct
{
    public function __invoke(array $data): Product
    {
        return Product::create($data);
    }
}
