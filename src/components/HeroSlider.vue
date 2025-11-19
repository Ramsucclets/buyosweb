<template>
  <section id="intro" class="position-relative">
    <div class="container-lg">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"
        :pagination="{ clickable: true }"
        class="main-swiper"
      >
        <swiper-slide>
          <div
            class="card d-flex flex-row align-items-end border-0 large jarallax-keep-img"
          >
            <img
              src="/images/card-image1.jpg"
              alt="shoes"
              class="img-fluid jarallax-img"
            />
            <div class="cart-concern p-3 m-3 p-lg-5 m-lg-5">
              <h2 class="card-title display-3 light">
                Stylish shoes for Women
              </h2>
              <a
                href="#"
                class="text-uppercase light mt-3 d-inline-block text-hover fw-bold light-border"
                >Shop Now</a
              >
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="row g-4">
            <div class="col-lg-12 mb-4">
              <div
                class="card d-flex flex-row align-items-end border-0 jarallax-keep-img"
              >
                <img
                  src="/images/card-image2.jpg"
                  alt="shoes"
                  class="img-fluid jarallax-img"
                />
                <div class="cart-concern p-3 m-3 p-lg-5 m-lg-5">
                  <h2 class="card-title style-2 display-4 light">
                    Sports Wear
                  </h2>
                  <a
                    href="#"
                    class="text-uppercase light mt-3 d-inline-block text-hover fw-bold light-border"
                    >Shop Now</a
                  >
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div
                class="card d-flex flex-row align-items-end border-0 jarallax-keep-img"
              >
                <img
                  src="/images/card-image3.jpg"
                  alt="shoes"
                  class="img-fluid jarallax-img"
                />
                <div class="cart-concern p-3 m-3 p-lg-5 m-lg-5">
                  <h2 class="card-title style-2 display-4 light">
                    Fashion Shoes
                  </h2>
                  <a
                    href="#"
                    class="text-uppercase light mt-3 d-inline-block text-hover fw-bold light-border"
                    >Shop Now</a
                  >
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div
            class="card d-flex flex-row align-items-end border-0 large jarallax-keep-img"
          >
            <img
              src="/images/card-large-item4.jpg"
              alt="shoes"
              class="img-fluid jarallax-img"
            />
            <div class="cart-concern p-3 m-3 p-lg-5 m-lg-5">
              <h2 class="card-title display-3 light">Stylish shoes for men</h2>
              <a
                href="#"
                class="text-uppercase light mt-3 d-inline-block text-hover fw-bold light-border"
                >Shop Now</a
              >
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="row g-4">
            <div class="col-lg-12 mb-4">
              <div
                class="card d-flex flex-row align-items-end border-0 jarallax-keep-img"
              >
                <img
                  src="/images/card-image5.jpg"
                  alt="shoes"
                  class="img-fluid jarallax-img"
                />
                <div class="cart-concern p-3 m-3 p-lg-5 m-lg-5">
                  <h2 class="card-title style-2 display-4 light">Men Shoes</h2>
                  <a
                    href="#"
                    class="text-uppercase light mt-3 d-inline-block text-hover fw-bold light-border"
                    >Shop Now</a
                  >
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div
                class="card d-flex flex-row align-items-end border-0 jarallax-keep-img"
              >
                <img
                  src="/images/card-image6.jpg"
                  alt="shoes"
                  class="img-fluid jarallax-img"
                />
                <div class="cart-concern p-3 m-3 p-lg-5 m-lg-5">
                  <h2 class="card-title style-2 display-4 light">
                    Women Shoes
                  </h2>
                  <a
                    href="#"
                    class="text-uppercase light mt-3 d-inline-block text-hover fw-bold light-border"
                    >Shop Now</a
                  >
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const modules = [Pagination];
</script>

<style scoped>
/* Ensure images cover the area as in original design */
.card-image1 {
  background: url("/images/card-image1.jpg") no-repeat;
  background-size: cover;
}
</style>
