<template>
  <section
    id="latest-products"
    class="product-store py-2 my-2 py-md-5 my-md-5 pt-0"
  >
    <div class="container-md">
      <div
        class="display-header d-flex align-items-center justify-content-between"
      >
        <h2 class="section-title text-uppercase">Latest Products</h2>
        <div class="btn-right">
          <a href="#" class="d-inline-block text-uppercase text-hover fw-bold"
            >View all</a
          >
        </div>
      </div>
      <div class="product-content padding-small">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
          <div
            class="col mb-4 mb-3"
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
    image: "/images/card-item6.jpg",
    title: "Running shoes for men",
    price: "$99",
  },
  {
    image: "/images/card-item7.jpg",
    title: "Running shoes for men",
    price: "$99",
  },
  {
    image: "/images/card-item8.jpg",
    title: "Running shoes for men",
    price: "$99",
  },
  {
    image: "/images/card-item9.jpg",
    title: "Running shoes for men",
    price: "$99",
  },
  {
    image: "/images/card-item10.jpg",
    title: "Running shoes for men",
    price: "$99",
  },
];
</script>
