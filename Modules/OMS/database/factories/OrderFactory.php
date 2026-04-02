<?php

namespace Modules\OMS\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Inventory\Models\Warehouse;
use Modules\OMS\Models\Order;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        $subtotal = $this->faker->randomFloat(2, 50, 2000);
        $discount = $this->faker->randomFloat(2, 0, $subtotal * 0.2);
        $taxable  = $subtotal - $discount;
        $tax      = round($taxable * 0.1, 2);
        $shipping = $subtotal >= 100 ? 0.0 : 5.0;

        return [
            'user_id'      => User::factory(),
            'warehouse_id' => Warehouse::factory(),
            'subtotal'     => $subtotal,
            'discount'     => $discount,
            'tax'          => $tax,
            'shipping'     => $shipping,
            'total'        => round($taxable + $tax + $shipping, 2),
            'region'       => $this->faker->randomElement(['VN', 'SG', 'US']),
        ];
    }

    public function approved(): static
    {
        return $this->state(['status' => 'approved', 'approved_at' => now()]);
    }

    public function cancelled(): static
    {
        return $this->state(['status' => 'cancelled', 'cancelled_at' => now()]);
    }
}
