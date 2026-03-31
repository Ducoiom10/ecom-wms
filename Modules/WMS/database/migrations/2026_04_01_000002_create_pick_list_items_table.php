<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pick_list_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pick_list_id')->constrained('pick_lists')->onDelete('cascade');
            $table->unsignedBigInteger('product_id')->index();
            $table->integer('quantity_required');
            $table->integer('quantity_picked')->default(0);
            $table->foreignId('location_id')->constrained('warehouse_locations')->onDelete('cascade');
            $table->timestamp('picked_at')->nullable();
            $table->unsignedBigInteger('picked_by')->nullable()->comment('user_id');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pick_list_items');
    }
};
