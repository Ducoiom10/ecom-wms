<template>
  <div class="min-h-screen flex flex-col bg-white">
    <CommonHeader />
    <main class="flex-1">
      <slot />
    </main>
    <CommonFooter />
    <CartSlideOverCart />
    <UiToastContainer />
  </div>
</template>
