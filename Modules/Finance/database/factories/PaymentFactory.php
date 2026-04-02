<?php

namespace Modules\Finance\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Finance\Models\Payment;
use Modules\OMS\Models\Order;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        return [
            'order_id'               => Order::factory(),
            'gateway'                => $this->faker->randomElement(['momo', 'vnpay', 'stripe', 'cod']),
            'gateway_transaction_id' => $this->faker->optional()->uuid(),
            'amount'                 => $this->faker->randomFloat(2, 50, 2000),
            'status'                 => 'pending',
            'reconciled'             => false,
            'reconciled_at'          => null,
        ];
    }

    public function paid(): static
    {
        return $this->state([
            'status'        => 'paid',
            'reconciled'    => true,
            'reconciled_at' => now(),
        ]);
    }
}
