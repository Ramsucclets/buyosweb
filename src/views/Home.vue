<template>
  <div class="home-page">
    <HeroSlider />
    <DiscountCoupon />
    <FeaturedProducts />
    <CollectionProducts />
    <LatestProducts />
    <!-- Add other sections like Testimonials, Instagram, etc. if they exist or were planned -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import HeroSlider from "../components/HeroSlider.vue";
import DiscountCoupon from "../components/DiscountCoupon.vue";
import FeaturedProducts from "../components/FeaturedProducts.vue";
import CollectionProducts from "../components/CollectionProducts.vue";
import LatestProducts from "../components/LatestProducts.vue";
import { jarallax } from "jarallax";

onMounted(() => {
  // Initialize Jarallax
  jarallax(document.querySelectorAll(".jarallax-keep-img"), {
    speed: 0.5,
    imgPosition: "50% 50%",
    imgSize: "cover",
  });
});
</script>
