<template>
  <section id="featured-products" class="product-store">
    <div class="container-md">
      <div
        class="display-header d-flex align-items-center justify-content-between"
      >
        <h2 class="section-title text-uppercase">Featured Products</h2>
        <div class="btn-right">
          <a href="#" class="d-inline-block text-uppercase text-hover fw-bold"
            >View all</a
          >
        </div>
      </div>
      <div class="product-content padding-small">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          <div
            class="col mb-4"
            v-for="(product, index) in products"
            :key="index"
          >
            <ProductCard
              :image="product.image"
              :title="product.title"
              :price="product.price"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductCard from "./ProductCard.vue";

const products = [
  {
    image: "/images/card-item1.jpg",
    title: "Phone Holder",
    price: "$99",
  },
  {
    image: "/images/card-item2.jpg",
    title: "Mini-Desk Drawer",
    price: "$99",
  },
  {
    image: "/images/card-item3.jpg",
    title: "Stationary Holder",
    price: "$99",
  },
];
</script>
