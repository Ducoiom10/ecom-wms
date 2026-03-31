<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->foreignId('warehouse_id')->constrained('warehouses')->onDelete('restrict');
            $table->string('status', 30)->default('pending')->index();
            $table->decimal('subtotal',  10, 2)->default(0);
            $table->decimal('discount',  10, 2)->default(0);
            $table->decimal('tax',       10, 2)->default(0);
            $table->decimal('shipping',  10, 2)->default(0);
            $table->decimal('total',     10, 2)->default(0);
            $table->string('region', 5)->default('VN');
            $table->string('coupon_code')->nullable();
            $table->string('delivery_address')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->text('cancel_reason')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
