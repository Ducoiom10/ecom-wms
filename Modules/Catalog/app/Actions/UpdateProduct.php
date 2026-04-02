<?php

namespace Modules\Catalog\Actions;

use Modules\Catalog\Models\Product;

class UpdateProduct
{
    public function __invoke(Product $product, array $data): Product
    {
        $product->update($data);
        return $product->fresh();
    }
}
