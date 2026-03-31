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
        Schema::create('warehouse_locations', function (Blueprint $table) {
            $table->id();
            // Khóa ngoại liên kết với bảng warehouses
            $table->foreignId('warehouse_id')->constrained('warehouses')->onDelete('cascade');

            // Tọa độ vật lý
            $table->string('aisle', 20)->comment('Dãy (VD: A1)');
            $table->string('rack', 20)->comment('Kệ (VD: R05)');
            $table->string('level', 20)->comment('Tầng (VD: L02)');
            $table->string('bin', 20)->comment('Ô/Thùng chứa hàng (VD: B01)');

            // Mã vạch dán trên ô chứa hàng
            $table->string('barcode', 100)->unique()->comment('Mã vạch, VD: HN01-A1-R05-L02-B01');

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warehouse_locations');
    }
};
