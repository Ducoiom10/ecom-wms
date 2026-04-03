<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->tinyInteger('rating')->unsigned()->comment('1-5');
            $table->string('title', 200)->nullable();
            $table->text('content');
            $table->json('images')->nullable();
            $table->unsignedInteger('helpful_count')->default(0);
            $table->boolean('is_flagged')->default(false)->index();
            $table->boolean('is_visible')->default(true)->index();
            $table->timestamps();
            $table->unique(['product_id', 'user_id']); // one review per product per user
            $table->index(['product_id', 'is_visible', 'created_at']);
        });

        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('type', ['home', 'work', 'other'])->default('home');
            $table->string('street');
            $table->string('city');
            $table->string('state')->nullable();
            $table->string('postal_code', 20);
            $table->string('country', 5)->default('VN');
            $table->boolean('is_default')->default(false);
            $table->timestamps();
            $table->index(['user_id', 'is_default']);
        });

        Schema::create('loyalty_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->onDelete('cascade');
            $table->unsignedInteger('points')->default(0);
            $table->enum('tier', ['bronze', 'silver', 'gold', 'platinum'])->default('bronze')->index();
            $table->unsignedInteger('total_redeemed')->default(0);
            $table->timestamps();
        });

        Schema::create('loyalty_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loyalty_account_id')->constrained('loyalty_accounts')->onDelete('cascade');
            $table->integer('points')->comment('positive=earn, negative=redeem');
            $table->enum('type', ['earn', 'redeem', 'expire', 'bonus']);
            $table->string('reason')->nullable();
            $table->unsignedBigInteger('reference_id')->nullable()->index();
            $table->timestamps();
            $table->index(['loyalty_account_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loyalty_transactions');
        Schema::dropIfExists('loyalty_accounts');
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('reviews');
    }
};
