<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventory_batches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('warehouse_location_id')->constrained('warehouse_locations')->onDelete('cascade');
            $table->string('batch_number')->unique();
            $table->foreignId('purchase_order_id')->nullable()->constrained('purchase_orders')->onDelete('set null');
            $table->foreignId('grn_id')->nullable()->constrained('goods_receipt_notes')->onDelete('set null');
            $table->integer('quantity')->default(0);
            $table->date('expiry_date')->nullable();
            $table->timestamp('received_date');
            $table->timestamp('fifo_sequence');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventory_batches');
    }
};
