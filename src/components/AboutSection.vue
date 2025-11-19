<template>
  <section id="about-us" class="py-5 overflow-hidden">
    <div class="container">
      <!-- CEO Statement Section -->
      <div class="row align-items-center mb-5">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <div class="image-holder position-relative">
            <img src="/images/ceo-image.png" alt="CEO" class="img-fluid rounded-4 shadow-lg position-relative z-2" />
            <div class="pattern-overlay position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-1 rounded-4" style="transform: translate(-15px, 15px); z-index: 1;"></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="about-content ps-lg-5">
            <h6 class="text-primary text-uppercase fw-bold mb-2 letter-spacing-2">Statement from our CEO</h6>
            <h2 class="display-5 fw-bold mb-4">A solution to a universal problem</h2>
            <figure class="mb-4">
              <blockquote class="blockquote">
                <p class="lead text-muted">
                  "BuYoS was conceived from an intriguing idea: To create spaces where there is no space. Our team used to face the worldwide problem where our workspace is simply too cramped of items and files. We came up with the solution. We are more than just selling organizers, we embrace and utilize the very core of Pattern-centered habit of us humans, to create a more productive and sustainable workspace and together achieve our goals."
                </p>
              </blockquote>
              <figcaption class="blockquote-footer mt-2">
                Rio Ferdinand <cite title="Source Title">CEO & Founder</cite>
              </figcaption>
            </figure>
            <p class="mb-4 text-secondary">
              Our journey began with a shared frustration. Our team faced a universal struggle: workspaces that were simply too cramped with items and files to allow for clarity. We didn't just want to tidy up; we wanted a solution. We utilize pattern-centered design to transform chaos into order, creating environments where you can achieve your goals efficiently.
            </p>
          </div>
        </div>
      </div>


      <!-- Testimonials Section -->
      <div class="row bg-light rounded-4 p-5">
        <div class="col-12 text-center mb-5">
          <h6 class="text-primary text-uppercase fw-bold letter-spacing-2">Testimonials</h6>
          <h2 class="display-5 fw-bold">What Our Customers Say</h2>
        </div>
        <div class="col-lg-4 mb-4 mb-lg-0">
          <div class="d-flex flex-column align-items-center text-center">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" class="rounded-circle mb-3 shadow-sm" width="80" height="80">
            <div class="mb-3 text-warning">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
            </div>
            <p class="text-muted mb-3">"Desainnya unik banget dan keliatan premium. Holdernya kokoh, pas dipake buat nonton video lama nggak goyang. klo aku paling suka bagian lengkungannya, keliatan niat dan rapi. Worth it sih"</p>
            <h6 class="fw-bold mb-0">Patrick Jehezkiel</h6>
          </div>
        </div>
        <div class="col-lg-4 mb-4 mb-lg-0">
          <div class="d-flex flex-column align-items-center text-center border-start border-end border-light-subtle px-3">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" class="rounded-circle mb-3 shadow-sm" width="80" height="80">
            <div class="mb-3 text-warning">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>
            </div>
            <p class="text-muted mb-3">"Bentuknya estetik banget. Waktu nyoba buat naruh HP, stand-nya stabil dan nggak licin. ukurannya kecil tapi kuat, pas banget buat dibawa ke mana-mana. Produk lokal kualitas gacor"</p>
            <h6 class="fw-bold mb-0">Joshua Sammy</h6>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="d-flex flex-column align-items-center text-center">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer" class="rounded-circle mb-3 shadow-sm" width="80" height="80">
            <div class="mb-3 text-warning">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
            </div>
            <p class="text-muted mb-3">"Awalnya cuma penasaran, tapi pas dicoba ternyata kualitasnya di atas ekspektasi. Bahannya tebal dan solid. Desainnya juga unik. Cocok sih buat yang suka estetik tapi fungsional"</p>
            <h6 class="fw-bold mb-0">Christian Kaliman</h6>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
// Component logic if needed
</script>

<style scoped>
.letter-spacing-2 {
  letter-spacing: 2px;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
}

.image-holder img {
  transition: transform 0.5s ease;
}

.image-holder:hover img {
  transform: scale(1.03);
}

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
</style>
