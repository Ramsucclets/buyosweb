<template>
  <section id="history" class="py-5 bg-light">
    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-lg-6 order-lg-2 mb-4 mb-lg-0">
          <div class="position-relative">
            <div 
              class="position-absolute top-0 end-0 w-100 h-100 bg-brand radius-xl" 
              style="transform: translate(25px, -25px); z-index: 0;"
            ></div>
            
            <div class="jarallax radius-xl shadow-lg position-relative z-1" data-jarallax style="height: 600px;">
              <img src="/images/card-image2.jpg" alt="Our History" class="jarallax-img" style="object-fit: cover;" />
            </div>
          </div>
        </div>

        <div class="col-lg-6 order-lg-1">
          <div class="pe-lg-5">
            <h6 class="text-brand text-uppercase fw-bold mb-2 letter-spacing-2">Featured Product</h6>
            <h2 class="display-5 fw-bold mb-4">Phone Holder</h2>
            <p class="lead text-muted mb-4">
              Simple, Adjustable and infinitely scalable. A uniquely designed product that caters to the student market.
            </p>
            
            <div class="features mt-5">
              <div class="feature-item mb-4 d-flex align-items-start">
                <div class="icon text-brand fs-4 me-4">
                  <i class="bi bi-sliders"></i>
                </div>
                <div class="content">
                  <h5 class="fw-bold">Fully Adjustable</h5>
                  <p class="text-secondary">Customizable settings to perfectly match your workflow and preferences.</p>
                </div>
              </div>
              <div class="feature-item mb-4 d-flex align-items-start">
                <div class="icon text-brand fs-4 me-4">
                  <i class="bi bi-graph-up-arrow"></i>
                </div>
                <div class="content">
                  <h5 class="fw-bold">Infinitely Scalable</h5>
                  <p class="text-secondary">Built to grow with your needs, handling increased demand without compromising performance.</p>
                </div>
              </div>
              <div class="feature-item d-flex align-items-start">
                <div class="icon text-brand fs-4 me-4">
                  <i class="bi bi-wallet2"></i>
                </div>
                <div class="content">
                  <h5 class="fw-bold">Student Friendly</h5>
                  <p class="text-secondary">Affordable pricing and intuitive design tailored specifically for the student market.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  });
});
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

:root {
  --brand-color: #eb0808;
}

.radius-xl {
  border-radius: 20px !important;
  overflow: hidden; 
}

.text-brand {
  color: #eb0808 !important;
}

.bg-brand {
  background-color: #eb0808 !important;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}
</style>