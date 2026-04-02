<?php

namespace Modules\Catalog\Actions;

use Modules\Catalog\Models\Product;

class DeleteProduct
{
    public function __invoke(Product $product): void
    {
        $product->delete();
    }
}
