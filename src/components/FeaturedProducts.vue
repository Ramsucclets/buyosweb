<template>
  <section id="featured-products" class="product-store">
    <div class="container-md">
      <div
        class="display-header d-flex align-items-center justify-content-between"
      >
        <h2 class="section-title text-uppercase">Our Products</h2>
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
              :image="product.images[0]"
              :title="product.title"
              :price="product.price"
              @view-product="openModal(product)"
            />
          </div>
        </div>
      </div>
    </div>

    <ProductModal 
      :isOpen="isModalOpen" 
      :product="selectedProduct" 
      @close="isModalOpen = false" 
    />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from "./ProductCard.vue";
import ProductModal from "./ProductModal.vue";

const isModalOpen = ref(false);
const selectedProduct = ref({ images: [], title: '', price: '' });

const openModal = (product) => {
  selectedProduct.value = product;
  isModalOpen.value = true;
};

const products = [
  {
    images: ["/images/card-item1.jpg", "/images/card-large-item1.jpg"],
    title: "Phone Holder",
    price: "Rp 60.000",
  },
  {
    images: ["/images/card-item2.jpg", "/images/card-large-item2.jpg"],
    title: "Mini-Desk Drawer",
    price: "Rp 60.000",
  },
  {
    images: ["/images/card-item3.jpg", "/images/card-large-item3.jpg"],
    title: "Stationary Holder",
    price: "Rp 60.000",
  },
];
</script>

<style scoped>
.product-content {
  padding-bottom: 2rem;
}
</style>
