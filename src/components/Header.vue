<template>
  <header id="header" class="site-header text-black position-fixed w-100 z-3" :class="{ scrolled: isScrolled }" style="top: 0;">
    <nav id="header-nav" class="navbar navbar-expand-lg px-3">
      <div class="container-fluid position-relative">
        <a class="navbar-brand" href="index.html">
          <h3 class="logo m-0 text-uppercase" style="font-weight: 800; letter-spacing: 1px;">BuYoS Store</h3>
        </a>
        
        <button
          class="navbar-toggler d-flex d-lg-none order-3 p-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#bdNavbar"
          aria-controls="bdNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg class="navbar-icon" width="24" height="24">
            <use xlink:href="#navbar-icon"></use>
          </svg>
        </button>

        <div class="offcanvas offcanvas-end" tabindex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel">
          <div class="offcanvas-header px-4 pb-0">
            <a class="navbar-brand" href="index.html">
              <h3 class="logo m-0 text-uppercase">BuYoS Store</h3>
            </a>
            <button
              type="button"
              class="btn-close btn-close-black"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              data-bs-target="#bdNavbar"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul
              id="navbar"
              class="navbar-nav text-uppercase fw-bold d-lg-flex align-items-center justify-content-center mx-auto"
            >
              <li class="nav-item">
                <a class="nav-link me-4 active" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link me-4" href="#about-us">About Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link me-4" href="#">Product</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link me-4 dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >Pages</a
                >
                <ul class="dropdown-menu fw-bold">
                  <li><a href="#about-us" class="dropdown-item">About Us</a></li>
                  <li><a class="dropdown-item" href="#">Product</a></li>
                  <li><a class="dropdown-item" href="index.html">Blog</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#footer">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="user-items ps-5">
          <ul class="d-flex justify-content-end list-unstyled align-items-center m-0">
            <li class="pe-3">
              <a href="#" class="border-0">
                <svg class="search" width="24" height="24">
                  <use xlink:href="#search"></use>
                </svg>
              </a>
            </li>
            <li class="pe-3">
              <a href="#" data-bs-toggle="modal" data-bs-target="#modallogin" class="border-0">
                <svg class="user" width="24" height="24">
                  <use xlink:href="#user"></use>
                </svg>
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="cart.openCart()" class="border-0 position-relative">
                <svg class="shopping-cart" width="24" height="24">
                  <use xlink:href="#shopping-cart"></use>
                </svg>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style="font-size: 0.6rem;">
                  {{ cart.totalItems }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { cart } from '../store/cart';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
header {
  transition: all 0.3s ease;
  backdrop-filter: blur(0px);
}

header.scrolled {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

header.scrolled .navbar-brand h3,
header.scrolled .nav-link,
header.scrolled .user-items svg {
  color: #000 !important;
  fill: #000 !important;
  text-shadow: none;
}

@media (min-width: 992px) {
  .navbar-brand h3,
  .nav-link,
  .user-items svg {
    color: #fff !important;
    fill: #fff !important;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  .nav-link:hover {
    color: var(--bs-primary) !important;
  }
  
  .navbar-nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 991px) {
  .navbar-brand h3,
  .nav-link,
  .user-items svg {
    color: #000 !important;
    fill: #000 !important;
  }
}

.user-items svg {
  transition: fill 0.3s ease;
}

.badge {
  font-size: 0.6rem !important;
}
</style>
