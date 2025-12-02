<template>
  <div class="product-card position-relative">
    <div class="card-img">
      <img :src="image" alt="product-item" class="product-image img-fluid" />
      <div class="cart-concern position-absolute d-flex justify-content-center">
        <div
          class="cart-button d-flex gap-2 justify-content-center align-items-center"
        >
          <button
            type="button"
            class="btn btn-light"
            @click="$emit('view-product')"
          >
            <svg class="quick-view">
              <use xlink:href="#quick-view"></use>
            </svg>
          </button>
          <button
            type="button"
            class="btn btn-light"
            @click="addToCart"
          >
            <svg class="shopping-carriage" width="24" height="24">
              <use xlink:href="#shopping-carriage"></use>
            </svg>
          </button>
        </div>
      </div>
      <!-- cart-concern -->
    </div>
    <div
      class="card-detail d-flex justify-content-between align-items-center mt-3"
    >
      <h3 class="card-title fs-6 fw-normal m-0">
        <a href="#">{{ title }}</a>
      </h3>
      <span class="card-price fw-bold">{{ price }}</span>
    </div>
  </div>
</template>

<script setup>
import { cart } from '../store/cart';

const props = defineProps({
  image: String,
  title: String,
  price: String,
});

const addToCart = () => {
  cart.addToCart({
    title: props.title,
    price: props.price,
    image: props.image
  });
  cart.openCart();
};
</script>

<style scoped>
/* Add any specific styles if needed, otherwise relies on global css */
</style>
