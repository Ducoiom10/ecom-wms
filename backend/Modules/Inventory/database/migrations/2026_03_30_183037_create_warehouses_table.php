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
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique()->comment('Mã kho, VD: HN-01');
            $table->string('name')->comment('Tên kho, VD: Kho Tổng Hà Nội');
            $table->string('address')->comment('Địa chỉ vật lý');
            $table->string('manager_name')->nullable()->comment('Tên quản lý kho');
            $table->boolean('is_active')->default(true)->comment('Trạng thái hoạt động');
            $table->timestamps();
            $table->softDeletes(); // Giữ lại lịch sử nếu lỡ tay xóa
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warehouses');
    }
};
