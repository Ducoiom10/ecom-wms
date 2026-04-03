<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();

            // Liên kết với bản ghi tồn kho cụ thể
            $table->foreignId('stock_id')->constrained('stocks')->onDelete('cascade');

            // Loại biến động: Nhập (in), Xuất (out), Chuyển kho (transfer), Kiểm kê (adjustment)
            $table->string('type', 20)->comment('in, out, transfer, adjustment');

            // Số lượng thay đổi (có thể là số âm hoặc dương)
            $table->integer('quantity')->comment('Số lượng cộng vào hoặc trừ đi');

            // LƯU DẤU VẾT (Traceability) - Cực kỳ quan trọng
            // Chứa tên của Model gây ra sự thay đổi này (VD: App\Models\Order, App\Models\PurchaseOrder)
            $table->string('reference_type')->nullable()->comment('Loại chứng từ liên quan');
            // Chứa ID của chứng từ đó
            $table->unsignedBigInteger('reference_id')->nullable()->comment('ID của chứng từ liên quan');

            $table->string('note')->nullable()->comment('Ghi chú giải trình');

            // Người thực hiện thao tác (sau này có bảng Users thì sẽ nối khóa ngoại)
            $table->unsignedBigInteger('user_id')->nullable()->comment('Người thao tác');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
