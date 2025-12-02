<template>
  <section id="team" class="py-5">
    <div class="container py-5">
      <div class="text-center mb-5">
        <h6 class="text-primary text-uppercase fw-bold mb-2 letter-spacing-2">Our Team</h6>
        <h2 class="display-5 fw-bold">Meet the Experts</h2>
      </div>
      
      <div class="row g-4">
        <div class="col-md-6 col-lg-3" v-for="(member, index) in teamMembers" :key="index">
          <div class="team-card text-center group">
            <div class="image-wrapper mb-4 position-relative overflow-hidden rounded-4">
              <img :src="member.image" :alt="member.name" class="img-fluid w-100 transition-transform duration-500 team-member-img" />
              <div class="social-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 opacity-0 transition-opacity duration-300">
                <div class="d-flex gap-3">
                  <a href="#" class="text-white hover-primary"><i class="bi bi-facebook"></i></a>
                  <a href="#" class="text-white hover-primary"><i class="bi bi-twitter"></i></a>
                  <a href="#" class="text-white hover-primary"><i class="bi bi-instagram"></i></a>
                </div>
              </div>
            </div>
            <h5 class="fw-bold mb-1">{{ member.name }}</h5>
            <p class="text-primary text-uppercase small fw-bold letter-spacing-1">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const teamMembers = [
  {
    name: "Dhama Nanda",
    role: "Technical Director",
    image: "/images/card-image3.jpg" 
  },
  {
    name: "Ronald Ceng",
    role: "Head of Growth",
    image: "/images/card-large-item4.jpg"
  },
  {
    name: "Ryan Reagen Dharmajaya",
    role: "Business Lead",
    image: "/images/card-image5.jpg"
  },
  {
    name: "Jericho Juan",
    role: "Operations Manager",
    image: "/images/card-image6.jpg"
  }
];
</script>

<style scoped>
.letter-spacing-1 {
  letter-spacing: 1px;
}
.letter-spacing-2 {
  letter-spacing: 2px;
}

.image-wrapper img {
  transition: transform 0.5s ease;
}

.image-wrapper:hover img {
  transform: scale(1.1);
}

.image-wrapper:hover .social-overlay {
  opacity: 1 !important;
}

.transition-opacity {
  transition: opacity 0.3s ease;
}

.team-member-img {
  aspect-ratio: 3 / 4;
  object-fit: cover;
}
</style>
