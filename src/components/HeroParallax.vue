<template>
  <section class="hero-parallax position-relative overflow-hidden">
    <div class="jarallax h-100 w-100 position-absolute top-0 start-0" data-jarallax>
      <img class="jarallax-img" src="/images/card-image1.jpg" alt="Hero Image" />
      <div class="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
    </div>
    
    <div class="container h-100 d-flex align-items-center justify-content-center position-relative z-2" style="min-height: 100vh;">
      <div class="text-center text-white">
        <h1 class="hero-title display-1 fw-bold text-uppercase mb-4">
          <span class="expanding-text">Elevate Your Style</span>
        </h1>
        <p class="lead mb-5 fs-3 fw-light">Discover the latest trends in fashion</p>
        <a href="#shop" class="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold text-uppercase tracking-wider hover-scale">
          Shop Collection
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { jarallax } from 'jarallax';
import 'jarallax/dist/jarallax.css';

onMounted(() => {
  jarallax(document.querySelectorAll('.jarallax'), {
    speed: 0.5,
    imgPosition: '50% 50%',
  });
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

.tracking-wider {
  letter-spacing: 2px;
}

.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
</style>
