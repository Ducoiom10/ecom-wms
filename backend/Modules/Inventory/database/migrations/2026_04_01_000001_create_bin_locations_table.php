<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bin_locations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->constrained('warehouse_locations')->onDelete('cascade');
            $table->string('sub_code', 50)->comment('VD: BIN-01A');
            $table->integer('capacity')->default(0)->comment('Sức chứa tối đa');
            $table->integer('current_utilization')->default(0)->comment('Đang sử dụng');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bin_locations');
    }
};
