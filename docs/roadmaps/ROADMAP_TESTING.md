# 🧪 LỘ TRÌNH KIỂM THỬ (Testing Strategy)

> **Ngày bắt đầu:** 01/04/2026 (song song với Development)  
> **Framework:** PHPUnit / Pest (Backend) + Vitest (Frontend) + Cypress/Playwright (E2E)  
> **Coverage Target:** > 80% code coverage  
> **Mục tiêu:** Zero critical bugs

---

## 📊 TESTING PYRAMID

```
                    ▲
                   /|\
                  / | \
                 /  |  \  E2E Tests (10%)
                /   |   \ Cypress/Playwright
               /    |    \
              /_____|_____\
             /      |      \
            /   Integration  \ Integration Tests (30%)
           /    PHPUnit/Pest   \ API + Database
          /________|________\
         /         |         \
        /    Unit Tests (60%)   \ PHPUnit/Vitest
       /  Models/Services/Repos   \ Fast feedback
      /___________|_______________\
```

---

## 🏗️ TESTING STRUCTURE

```
tests/
├─ Unit/
│  ├─ Models/
│  ├─ Services/
│  ├─ Repositories/
│  └─ DataObjects/
├─ Feature/
│  ├─ API/
│  ├─ Auth/
│  ├─ Checkout/
│  ├─ Inventory/
│  ├─ Orders/
│  └─ Shipping/
├─ Integration/
│  ├─ Database/
│  ├─ Cache/
│  └─ Queue/
└─ E2E/
   ├─ Storefront/
   └─ Admin/
```

---

## 📌 UNIT TESTS (60%)

**Target:** All models, services, repositories, DTOs  
**Tools:** PHPUnit / Pest  
**Speed:** < 100ms per test

### 1️⃣ Model Tests

#### **Brand Model**

```php
test('brand has many products', function () {
    $brand = Brand::factory()->create();
    $products = Product::factory(3)->create(['brand_id' => $brand->id]);

    expect($brand->products()->count())->toBe(3);
});

test('brand validation', function () {
    Brand::factory()->create(['name' => 'Apple']);

    expect(fn() => Brand::factory()->create(['name' => 'Apple']))
        ->toThrow(QueryException::class);
});
```

#### **Product Model**

```php
test('product has many variants', function () {
    $product = Product::factory()->create();
    ProductVariant::factory(2)->create(['product_id' => $product->id]);

    expect($product->variants()->count())->toBe(2);
});

test('product price fallback to default', function () {
    $product = Product::factory()->create(['price' => 1000]);
    $variant = ProductVariant::factory()->create([
        'product_id' => $product->id,
        'price_override' => null
    ]);

    expect($variant->getFinalPrice())->toBe(1000);
});

test('product with json attributes', function () {
    $product = Product::factory()->create([
        'attributes' => ['color' => 'red', 'size' => 'M']
    ]);

    expect($product->attributes['color'])->toBe('red');
});
```

#### **Order Model**

```php
test('order state transitions', function () {
    $order = Order::factory(['status' => 'pending'])->create();

    $order->approve();
    expect($order->status)->toBe('approved');

    $order->pickItems();
    expect($order->status)->toBe('picking');
});

test('order prevents invalid transitions', function () {
    $order = Order::factory(['status' => 'delivered'])->create();

    expect(fn() => $order->approve())
        ->toThrow(InvalidOrderStateException::class);
});
```

### 2️⃣ Repository Tests

#### **ProductRepository**

```php
test('search products by name', function () {
    Product::factory()->create(['name' => 'MacBook Pro']);
    Product::factory()->create(['name' => 'Dell XPS']);

    $repo = new ProductRepository(new Product());
    $results = $repo->search('MacBook');

    expect($results->count())->toBe(1);
    expect($results[0]->name)->toBe('MacBook Pro');
});

test('paginate products', function () {
    Product::factory(25)->create();

    $repo = new ProductRepository(new Product());
    $paginated = $repo->paginate(10);

    expect($paginated->total())->toBe(25);
    expect($paginated->perPage())->toBe(10);
});

test('find products by attribute value', function () {
    $product1 = Product::factory()->create();
    $product1->attributeValues()->create([
        'attribute_id' => 1,
        'value' => 'Black'
    ]);

    $repo = new ProductRepository(new Product());
    $results = $repo->findByAttribute(1, 'Black');

    expect($results->count())->toBe(1);
});
```

#### **PurchaseOrderRepository**

```php
test('find pending purchase orders', function () {
    PurchaseOrder::factory(3)->create(['status' => 'pending']);
    PurchaseOrder::factory(2)->create(['status' => 'approved']);

    $repo = new PurchaseOrderRepository(new PurchaseOrder());
    $pending = $repo->findByStatus('pending');

    expect($pending->count())->toBe(3);
});

test('find orders by date range', function () {
    PurchaseOrder::factory()->create([
        'created_at' => now()->subDays(10)
    ]);
    PurchaseOrder::factory()->create([
        'created_at' => now()
    ]);

    $repo = new PurchaseOrderRepository(new PurchaseOrder());
    $recent = $repo->findByDateRange(now()->subDays(5), now());

    expect($recent->count())->toBe(1);
});
```

### 3️⃣ Service Tests

#### **ProductService**

```php
it('creates product with attributes', function () {
    $service = new ProductService(new ProductRepository(new Product()));

    $product = $service->createProduct([
        'name' => 'iPhone 16',
        'sku' => 'IPHONE-16-01',
        'price' => 25000000,
        'attributes' => ['color' => 'Black', 'storage' => '256GB']
    ]);

    expect($product->name)->toBe('iPhone 16');
    expect($product->attributes['color'])->toBe('Black');
});

it('adds product variant with transaction', function () {
    $product = Product::factory()->create();
    $service = new ProductService(new ProductRepository(new Product()));

    $variant = $service->addVariant($product->id, [
        'sku' => 'VAR-01',
        'name' => 'Black 256GB',
        'price_override' => 26000000
    ]);

    expect($variant->sku)->toBe('VAR-01');
    expect(ProductVariant::count())->toBe(1);
});

it('handles concurrent updates safely', function () {
    $product = Product::factory()->create();
    $service = new ProductService(new ProductRepository(new Product()));

    $results = parallel(
        fn() => $service->updateProduct($product->id, ['name' => 'Name 1']),
        fn() => $service->updateProduct($product->id, ['name' => 'Name 2'])
    );

    expect(Product::find($product->id)->name)->toBeIn(['Name 1', 'Name 2']);
});
```

#### **PurchaseOrderService**

```php
it('creates purchase order with items', function () {
    $supplier = Supplier::factory()->create();
    $products = Product::factory(2)->create();

    $service = new PurchaseOrderService(new PurchaseOrderRepository(new PurchaseOrder()));

    $po = $service->createPO($supplier->id, [
        ['product_id' => $products[0]->id, 'quantity' => 10, 'unit_price' => 100],
        ['product_id' => $products[1]->id, 'quantity' => 5, 'unit_price' => 200]
    ]);

    expect($po->items()->count())->toBe(2);
    expect($po->total_amount)->toBe(2000);
});

it('prevents approving incomplete purchase order', function () {
    $po = PurchaseOrder::factory(['status' => 'pending'])->create();

    $service = new PurchaseOrderService(new PurchaseOrderRepository(new PurchaseOrder()));

    expect(fn() => $service->approvePO($po->id, null))
        ->toThrow(ValidationException::class);
});
```

#### **CartService**

```php
it('adds item to cart', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create(['price' => 100]);

    $service = new CartService();
    $service->addItem($user->id, $product->id, 2);

    $cart = $service->getCart($user->id);
    expect($cart->items[0]['quantity'])->toBe(2);
    expect($cart->total)->toBe(200);
});

it('applies coupon with discount', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create(['price' => 100]);

    $service = new CartService();
    $service->addItem($user->id, $product->id, 1);
    $service->applyCoupon($user->id, 'SAVE10'); // 10% off

    $cart = $service->getCart($user->id);
    expect($cart->discount)->toBe(10);
    expect($cart->total)->toBe(90);
});
```

### 4️⃣ DTO Tests

```php
test('product dto conversion', function () {
    $product = Product::factory()->create([
        'name' => 'MacBook',
        'price' => 30000000
    ]);

    $dto = new ProductDTO(
        id: $product->id,
        name: $product->name,
        price: $product->price,
        // ...
    );

    $array = $dto->toArray();
    expect($array['name'])->toBe('MacBook');

    $json = $dto->toJson();
    expect(json_decode($json)->name)->toBe('MacBook');
});
```

---

## 📌 INTEGRATION TESTS (30%)

**Target:** API workflows, database transactions  
**Tools:** PHPUnit with DatabaseTransactions  
**Speed:** < 500ms per test

### 1️⃣ Stock Management Tests

```php
use Illuminate\Foundation\Testing\DatabaseTransactions;

class InventoryTest extends TestCase
{
    use DatabaseTransactions;

    test('deduct stock with lock', function () {
        $product = Product::factory()->create();
        Stock::factory()->create([
            'product_id' => $product->id,
            'quantity' => 100
        ]);

        $service = new StockService();
        $service->deductStock($product->id, 30);

        $stock = Stock::where('product_id', $product->id)->first();
        expect($stock->quantity)->toBe(70);
    });

    test('fifo algorithm picks oldest batch', function () {
        $product = Product::factory()->create();

        $batch1 = InventoryBatch::factory()->create([
            'product_id' => $product->id,
            'quantity' => 10,
            'received_date' => now()->subDays(10)
        ]);

        $batch2 = InventoryBatch::factory()->create([
            'product_id' => $product->id,
            'quantity' => 10,
            'received_date' => now()->subDays(5)
        ]);

        $service = new InventoryFIFOService();
        $reserved = $service->reserveStock($product->id, 15);

        expect($reserved[0]['batch_id'])->toBe($batch1->id);
        expect($reserved[0]['quantity'])->toBe(10);
        expect($reserved[1]['batch_id'])->toBe($batch2->id);
        expect($reserved[1]['quantity'])->toBe(5);
    });

    test('stock movement logged', function () {
        $product = Product::factory()->create();
        Stock::factory()->create(['product_id' => $product->id, 'quantity' => 100]);

        $service = new StockService();
        $service->deductStock($product->id, 20);

        $movement = StockMovement::where('product_id', $product->id)->first();
        expect($movement->movement_type)->toBe('out');
        expect($movement->quantity)->toBe(20);
    });

    test('concurrent stock updates dont conflict', function () {
        $product = Product::factory()->create();
        Stock::factory()->create(['product_id' => $product->id, 'quantity' => 100]);

        parallel(
            fn() => app(StockService::class)->deductStock($product->id, 10),
            fn() => app(StockService::class)->deductStock($product->id, 20),
            fn() => app(StockService::class)->deductStock($product->id, 15)
        );

        $stock = Stock::where('product_id', $product->id)->first();
        expect($stock->quantity)->toBe(55);
    });
}
```

### 2️⃣ Checkout Flow Tests

```php
class CheckoutTest extends TestCase
{
    use DatabaseTransactions;

    test('complete checkout flow', function () {
        $customer = User::factory(['role' => 'customer'])->create();
        $product = Product::factory()->create(['price' => 100]);
        Stock::factory()->create(['product_id' => $product->id, 'quantity' => 10]);

        // Add to cart
        $this->actingAs($customer)
            ->postJson('/api/cart/items', [
                'product_id' => $product->id,
                'quantity' => 2
            ])->assertOk();

        // Checkout
        $response = $this->postJson('/api/orders', [
            'items' => [['product_id' => $product->id, 'quantity' => 2]],
            'shipping_address' => [
                'street' => '123 Main St',
                'city' => 'Hanoi',
                'postal_code' => '100000'
            ]
        ])->assertCreated();

        $order = Order::latest()->first();
        expect($order->status)->toBe('pending');
        expect($order->total)->toBe(200);

        // Verify stock deducted
        $stock = Stock::where('product_id', $product->id)->first();
        expect($stock->quantity)->toBe(8);
    });

    test('stock prevents overselling', function () {
        $product = Product::factory()->create();
        Stock::factory()->create(['product_id' => $product->id, 'quantity' => 5]);

        $order = Order::factory()->create();
        OrderItem::factory()->create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'quantity' => 10 // More than available
        ]);

        expect(fn() => app(StockService::class)->reserveStock($product->id, 10))
            ->toThrow(InsufficientStockException::class);
    });

    test('order transitions through states correctly', function () {
        $order = Order::factory(['status' => 'pending'])->create();

        $order->approve();
        expect($order->status)->toBe('approved');

        $order->pickItems();
        expect($order->status)->toBe('picking');

        $order->ship();
        expect($order->status)->toBe('shipped');

        $order->deliver();
        expect($order->status)->toBe('delivered');
    });
}
```

### 3️⃣ Price Calculation Tests

```php
class PricingTest extends TestCase
{
    use DatabaseTransactions;

    test('decorator pattern price calculation', function () {
        $order = Order::factory()->create([
            'subtotal' => 100,
            'region' => 'Hanoi',
            'voucher_code' => 'SAVE10'
        ]);

        $calculator = new BasePriceCalculator()
            ->setNext(new TaxCalculator($order->region))        // +8%
            ->setNext(new ShippingCalculator($order->address))   // +10
            ->setNext(new VoucherDiscountCalculator('SAVE10'));  // -10%

        $total = $calculator->calculate(100);

        expect($total)->toBe(96.8); // 100 + 8 + 10 - 10% off
    });

    test('loyalty points applied correctly', function () {
        $customer = User::factory()->create();
        $customer->loyalty()->create(['points' => 100]); // 1 point = 0.01 discount

        $order = Order::factory(['user_id' => $customer->id])->create([
            'subtotal' => 100
        ]);

        $calculator = new BasePriceCalculator()
            ->setNext(new LoyaltyPointsCalculator($customer));

        $total = $calculator->calculate(100);
        expect($total)->toBe(99); // 100 - 1 (100 points × 0.01)
    });
}
```

### 4️⃣ API Integration Tests

```php
class ProductAPITest extends TestCase
{
    use DatabaseTransactions;

    test('list products with pagination', function () {
        Product::factory(25)->create();

        $response = $this->getJson('/api/products?page=1&limit=10')
            ->assertOk();

        expect($response->json('data'))->toHaveCount(10);
        expect($response->json('pagination.total'))->toBe(25);
    });

    test('filter products by category', function () {
        $category = Category::factory()->create();
        Product::factory(3)->create(['category_id' => $category->id]);
        Product::factory(2)->create();

        $response = $this->getJson("/api/products?category={$category->slug}")
            ->assertOk();

        expect($response->json('data'))->toHaveCount(3);
    });

    test('search products', function () {
        Product::factory()->create(['name' => 'MacBook Pro']);
        Product::factory()->create(['name' => 'Dell XPS']);

        $response = $this->getJson('/api/products/search?q=MacBook')
            ->assertOk();

        expect($response->json('data'))->toHaveCount(1);
        expect($response->json('data.0.name'))->toBe('MacBook Pro');
    });
}
```

---

## 📌 E2E TESTS (10%)

**Target:** Critical user workflows  
**Tools:** Cypress / Playwright  
**Speed:** 1-5 seconds per test

### 1️⃣ Storefront E2E

```javascript
// tests/e2e/storefront/checkout.cy.js
describe("Customer Checkout Flow", () => {
    it("should complete purchase from product to order", () => {
        // Navigate to homepage
        cy.visit("http://localhost:3000");
        cy.get("[data-cy=header]").should("be.visible");

        // Search for product
        cy.get("[data-cy=search-input]").type("MacBook");
        cy.get("[data-cy=search-results] [data-cy=product-card]")
            .first()
            .click();

        // Add variant
        cy.get("[data-cy=variant-color]").select("Black");
        cy.get("[data-cy=variant-size]").select('16"');

        // Add to cart
        cy.get("[data-cy=add-to-cart]").click();
        cy.get("[data-cy=toast-success]").should("contain", "Added to cart");

        // Open cart
        cy.get("[data-cy=cart-icon]").click();
        cy.get("[data-cy=cart-items]").should("contain", "MacBook");

        // Checkout
        cy.get("[data-cy=checkout-button]").click();
        cy.location("pathname").should("eq", "/checkout/auth");

        // Login
        cy.get("[data-cy=email]").type("customer@example.com");
        cy.get("[data-cy=password]").type("password");
        cy.get("[data-cy=login-button]").click();

        // Shipping
        cy.location("pathname").should("eq", "/checkout/shipping");
        cy.get("[data-cy=address]").type("123 Main St");
        cy.get("[data-cy=next-button]").click();

        // Payment
        cy.location("pathname").should("eq", "/checkout/payment");
        cy.get("[data-cy=credit-card]").click();
        cy.get("[data-cy=pay-button]").click();

        // Success
        cy.location("pathname").should("eq", "/checkout/success");
        cy.get("[data-cy=order-confirmation]").should(
            "contain",
            "Order placed successfully",
        );
    });

    it("applies coupon correctly", () => {
        cy.visit("http://localhost:3000/cart");
        cy.get("[data-cy=subtotal]").should("contain", "25,000,000");

        cy.get("[data-cy=coupon-input]").type("SAVE10");
        cy.get("[data-cy=apply-coupon]").click();

        cy.get("[data-cy=discount]").should("contain", "2,500,000");
        cy.get("[data-cy=total]").should("contain", "22,500,000");
    });
});
```

### 2️⃣ Admin E2E

```javascript
// tests/e2e/admin/product-management.cy.js
describe("Admin Product Creation", () => {
    beforeEach(() => {
        cy.login({ role: "admin" });
        cy.visit("http://localhost:8000/admin/products");
    });

    it("should create product with variants and images", () => {
        cy.get("[data-cy=create-button]").click();

        // General tab
        cy.get("input[name=name]").type("iPhone 16 Pro");
        cy.get("input[name=sku]").type("IPHONE-16-PRO-001");
        cy.get("textarea[name=description]").type(
            "Latest iPhone with Pro camera",
        );
        cy.get("select[name=category_id]").select("Smartphones");
        cy.get("select[name=brand_id]").select("Apple");
        cy.get("input[name=price]").type("25000000");

        // Attributes tab
        cy.contains("Attributes (JSON)").click();
        cy.get("[data-cy=add-attribute]").click();
        cy.get("input[data-cy=attr-key]").type("color");
        cy.get("input[data-cy=attr-value]").type("Black");

        // Variants tab
        cy.contains("Variants").click();
        cy.get("[data-cy=add-variant]").click();
        cy.get("input[data-cy=variant-sku]").type("IPHONE-16-PRO-256");
        cy.get("input[data-cy=variant-price]").type("26000000");

        // Images tab
        cy.contains("Images").click();
        cy.get("[data-cy=upload-images]").selectFile(
            "cypress/fixtures/product.jpg",
        );

        // Save
        cy.get("[data-cy=save-button]").click();
        cy.get("[data-cy=toast-success]").should("contain", "Product created");

        cy.get("table").should("contain", "iPhone 16 Pro");
    });
});
```

---

## 🧠 TESTING BEST PRACTICES

### ✅ DO's

```php
// ✅ GOOD: Clear test name
test('order status changes from pending to approved', function () {
    // Arrange
    $order = Order::factory(['status' => 'pending'])->create();

    // Act
    $order->approve();

    // Assert
    expect($order->status)->toBe('approved');
});

// ✅ GOOD: Use factories
$user = User::factory()->create(['email' => 'test@example.com']);

// ✅ GOOD: Use DatabaseTransactions
use Illuminate\Foundation\Testing\DatabaseTransactions;
class TestCase extends TestCase {
    use DatabaseTransactions;
}

// ✅ GOOD: Test one thing per test
test('order total calculation', function () {
    // Only test total calculation, not state changes
});

// ✅ GOOD: Mock external APIs
$this->mock(CarrierProxy::class)
    ->shouldReceive('createShipment')
    ->andReturn('TRK-123');
```

### ❌ DON'Ts

```php
// ❌ BAD: Vague test name
test('ordertest', function () { });

// ❌ BAD: Test multiple things
test('create and update and delete order', function () { });

// ❌ BAD: Hardcoded IDs
$order = Order::find(1);

// ❌ BAD: Slow operations in tests
test('send email', function () {
    Mail::send(new OrderConfirmation(...)); // Too slow!
});

// ❌ BAD: No cleanup
test('upload file', function () {
    Storage::put('test.txt', 'data');
    // Cleanup missing!
});
```

---

## 📊 TESTING METRICS

### Target Coverage

```
Application:  >85%
Models:       100%
Services:     >90%
Controllers:  >80%
Overall:      >80%
```

### Commands

```bash
# Run all tests
php artisan test

# Run with coverage
php artisan test --coverage

# Run specific test file
php artisan test tests/Feature/CheckoutTest.php

# Run tests matching pattern
php artisan test --filter=payment

# Parallel testing (faster)
php artisan test --parallel

# Watch mode (run on file changes)
php artisan test --watch
```

---

## 🔄 CI/CD INTEGRATION

### GitHub Actions

```yaml
name: Tests

on: [push, pull_request]

jobs:
    test:
        runs-on: ubuntu-latest
        services:
            mysql:
                image: mysql:8.0
                env:
                    MYSQL_DATABASE: ecom_wms_test
                    MYSQL_ROOT_PASSWORD: root
        steps:
            - uses: actions/checkout@v2
            - uses: php-actions/composer@v6
            - run: php artisan test --coverage

    frontend:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v2
              with:
                  node-version: "18"
            - run: npm install
            - run: npm run test
```

---

## ✅ TESTING CHECKLIST

### Sprint 1

- [ ] All 12 models have unit tests
- [ ] All repositories have tests (CRUD + custom methods)
- [ ] All services have tests (business logic)
- [ ] API endpoints tested

### Sprint 2

- [ ] FIFO algorithm tested
- [ ] Order state transitions tested
- [ ] Stock locking tested
- [ ] Price calculation tested

### Sprint 3

- [ ] Mock carrier APIs
- [ ] Queue tests
- [ ] RBAC tests

### Sprint 4-6

- [ ] E2E checkout flow
- [ ] E2E admin product creation
- [ ] E2E order management
- [ ] Responsive design tests

---

**Last Updated:** 01/04/2026  
**Version:** 1.0  
**Status:** Testing strategy ready
