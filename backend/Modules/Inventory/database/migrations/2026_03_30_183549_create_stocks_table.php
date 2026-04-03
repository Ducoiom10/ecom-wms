<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            // Liên kết với sản phẩm (thường dùng ID hoặc SKU)
            $table->foreignId('product_id')->index();
            // Liên kết với vị trí cụ thể trong kho
            $table->foreignId('warehouse_location_id')->constrained('warehouse_locations');

            $table->integer('quantity')->default(0)->comment('Số lượng thực tế tại vị trí này');
            $table->integer('reserved_quantity')->default(0)->comment('Số lượng đã bị giữ chỗ (khách đang đặt hàng)');

            $table->timestamps();

            // Đảm bảo một sản phẩm tại một vị trí chỉ có 1 dòng duy nhất
            $table->unique(['product_id', 'warehouse_location_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};
