<template>
  <div v-if="isOpen" class="product-modal-overlay" @click.self="close">
    <div class="product-modal-content">
      <button class="close-button" @click="close">&times;</button>
      
      <div class="modal-body">
        <div class="image-slider">
          <div class="slider-wrapper" :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }" v-if="product.images">
            <div v-for="(image, index) in product.images" :key="index" class="slide">
              <img :src="image" :alt="product.title" class="slider-image" />
            </div>
          </div>
          
          <button v-if="product.images && product.images.length > 1" class="slider-control prev" @click="prevImage">&#10094;</button>
          <button v-if="product.images && product.images.length > 1" class="slider-control next" @click="nextImage">&#10095;</button>
          
          <div class="slider-dots" v-if="product.images && product.images.length > 1">
            <span 
              v-for="(image, index) in product.images" 
              :key="index" 
              class="dot" 
              :class="{ active: currentImageIndex === index }"
              @click="currentImageIndex = index"
            ></span>
          </div>
        </div>
        
        <div class="product-details">
          <h2 class="modal-title">{{ product.title }}</h2>
          <p class="modal-price">{{ product.price }}</p>
          <p class="modal-description">
            Experience the quality and design of our {{ product.title }}. 
            Perfect for your workspace setup.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  product: {
    type: Object,
    default: () => ({ images: [], title: '', price: '' })
  }
});

const emit = defineEmits(['close']);

const currentImageIndex = ref(0);

const close = () => {
  emit('close');
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.product.images.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + props.product.images.length) % props.product.images.length;
};

// Reset slider when modal opens
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    currentImageIndex.value = 0;
  }
});
</script>

<style scoped>
.product-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Bootstrap modal z-index is 1055, keeping it high */
}

.product-modal-content {
  background-color: white;
  width: 90%;
  max-width: 1000px;
  height: 80vh; /* Semi full screen */
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.close-button {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
}

.modal-body {
  display: flex;
  height: 100%;
  overflow-y: auto;
}

.image-slider {
  flex: 1.5;
  position: relative;
  background-color: #f8f9fa;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.slider-wrapper {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  height: 100%;
}

.slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.slider-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
}

.slider-control:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.prev { left: 10px; }
.next { right: 10px; }

.slider-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: rgba(0,0,0,0.3);
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  background-color: rgba(0,0,0,0.8);
}

.product-details {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-title {
  font-size: 2rem;
  margin-bottom: 10px;
}

.modal-price {
  font-size: 1.5rem;
  color: #727272;
  margin-bottom: 20px;
  font-weight: bold;
}

.modal-description {
  margin-bottom: 30px;
  line-height: 1.6;
}

.add-to-cart-btn {
  align-self: flex-start;
  padding: 10px 30px;
}

@media (max-width: 768px) {
  .modal-body {
    flex-direction: column;
  }
  
  .image-slider {
    flex: 1;
    min-height: 300px;
  }
  
  .product-details {
    flex: 1;
    padding: 20px;
  }
}
</style>
