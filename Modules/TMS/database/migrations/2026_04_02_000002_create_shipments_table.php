<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('zone_id')->nullable()->constrained('delivery_zones')->nullOnDelete();
            $table->string('carrier', 30)->index()->comment('ghtk, viettel, grab, ahamove');
            $table->string('status', 30)->default('pending')->index();
            $table->string('tracking_id')->nullable()->unique();
            $table->decimal('total_weight', 8, 2)->default(0);
            $table->decimal('shipping_fee',  8, 2)->default(0);
            $table->string('current_location')->nullable();
            $table->timestamp('estimated_delivery')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
