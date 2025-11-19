<template>
  <section class="hero-parallax position-relative overflow-hidden">
    <div ref="parallaxContainer" class="jarallax position-absolute top-0 start-0 w-100 h-100">
      <img class="jarallax-img" src="/images/card-image1.jpg" alt="Hero Image" />
      <div class="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark transition-opacity" :class="isHovered ? 'opacity-0' : 'opacity-25'"></div>
    </div>
    
    <div class="container h-100 d-flex align-items-center justify-content-center position-relative z-2" style="min-height: 100vh;">
      <div class="text-center text-white transition-opacity" 
           @mouseenter="isHovered = true" 
           @mouseleave="isHovered = false"
           :class="{ 'opacity-0': isHovered }">
        <h1 class="hero-title display-1 fw-bold text-uppercase mb-4">
          <span class="expanding-text">Bu You Space</span>
        </h1>
        <p class="lead mb-5 fs-3 fw-bold hero-subtitle">Optimizing Your DeskSpace</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { jarallax } from 'jarallax';
import 'jarallax/dist/jarallax.css';

const parallaxContainer = ref(null);
const isHovered = ref(false);

onMounted(() => {
  if (parallaxContainer.value) {
    jarallax(parallaxContainer.value, {
      speed: 0.5,
      imgPosition: '50% 50%',
    });
  }
});
</script>

<style scoped>
.hero-parallax {
  min-height: 100vh;
}

.hero-title {
  overflow: hidden;
}

.expanding-text {
  display: inline-block;
  animation: expandText 2s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
  white-space: nowrap;
}

@keyframes expandText {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
    transform: scale(0.8);
  }
  40% {
    opacity: 0.6;
  }
  100% {
    letter-spacing: normal;
    opacity: 1;
    transform: scale(1);
  }
}

.hero-subtitle {
  color: #e63946;
}

.tracking-wider {
  letter-spacing: 2px;
}

.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.transition-opacity {
  transition: opacity 0.6s ease;
}
</style>
