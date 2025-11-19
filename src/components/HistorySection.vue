<template>
  <section id="history" class="py-5 bg-light">
    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-lg-6 order-lg-2 mb-4 mb-lg-0">
          <div class="position-relative">
            <img src="/images/card-image2.jpg" alt="Our History" class="img-fluid rounded-4 shadow-lg position-relative z-2" />
            <div class="position-absolute top-0 end-0 w-100 h-100 bg-primary opacity-10 rounded-4" style="transform: translate(15px, -15px); z-index: 1;"></div>
          </div>
        </div>
        <div class="col-lg-6 order-lg-1">
          <div class="pe-lg-5">
            <h6 class="text-primary text-uppercase fw-bold mb-2 letter-spacing-2">Featured Product</h6>
            <h2 class="display-5 fw-bold mb-4">Phone Holder </h2>
            <p class="lead text-muted mb-4">
              Simple, Adjustable and infinitely scalable. A uniquely designed product that caters to the student market.
            </p>
            <div class="features mt-5">
              <div class="feature-item mb-4 d-flex align-items-start">
                <div class="icon text-primary fs-4 me-4">
                  <i class="bi bi-sliders"></i>
                </div>
                <div class="content">
                  <h5 class="fw-bold">Fully Adjustable</h5>
                  <p class="text-secondary">Customizable settings to perfectly match your workflow and preferences.</p>
                </div>
              </div>
              <div class="feature-item mb-4 d-flex align-items-start">
                <div class="icon text-primary fs-4 me-4">
                  <i class="bi bi-graph-up-arrow"></i>
                </div>
                <div class="content">
                  <h5 class="fw-bold">Infinitely Scalable</h5>
                  <p class="text-secondary">Built to grow with your needs, handling increased demand without compromising performance.</p>
                </div>
              </div>
              <div class="feature-item d-flex align-items-start">
                <div class="icon text-primary fs-4 me-4">
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

<style scoped>
.letter-spacing-2 {
  letter-spacing: 2px;
}

/* Bootstrap Icons fallback if not loaded globally */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
</style>
