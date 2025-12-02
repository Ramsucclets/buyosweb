<template>
  <div v-if="cart.state.isOpen" class="cart-modal-overlay" @click.self="cart.closeCart">
    <div class="cart-modal-content">
      <div class="cart-header">
        <h2>Your Cart</h2>
        <button class="close-button" @click="cart.closeCart">&times;</button>
      </div>
      
      <div class="cart-body">
        <div v-if="cart.state.items.length === 0" class="empty-cart">
          <p>Your cart is empty.</p>
        </div>
        <div v-else class="cart-items">
          <div v-for="(item, index) in cart.state.items" :key="index" class="cart-item">
            <div class="item-image">
              <img :src="item.images && item.images[0] ? item.images[0] : item.image" :alt="item.title" />
            </div>
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <p class="item-price">{{ item.price }}</p>
              <div class="item-quantity">
                <button @click="cart.updateQuantity(index, item.quantity - 1)">
                  <svg width="12" height="12">
                    <use xlink:href="#minus"></use>
                  </svg>
                </button>
                <span>{{ item.quantity }}</span>
                <button @click="cart.updateQuantity(index, item.quantity + 1)">
                  <svg width="12" height="12">
                    <use xlink:href="#plus"></use>
                  </svg>
                </button>
              </div>
            </div>
            <button class="remove-button" @click="cart.removeFromCart(index)">&times;</button>
          </div>
        </div>
      </div>
      
      <div class="cart-footer" v-if="cart.state.items.length > 0">
        <div class="customer-details mb-3">
          <div class="mb-2">
            <label for="customerName" class="form-label">Name</label>
            <input type="text" id="customerName" v-model="customerName" class="form-control" placeholder="Enter your name">
          </div>
          <div class="mb-2">
            <label for="shippingAddress" class="form-label">Shipping Address</label>
            <textarea id="shippingAddress" v-model="shippingAddress" class="form-control" rows="3" placeholder="Enter your shipping address"></textarea>
          </div>
        </div>
        <!-- <div class="cart-total">
          <span>Total:</span>
          <span>{{ cart.totalPrice }}</span> 
        </div> -->
        <button class="btn btn-dark checkout-btn text-uppercase" @click="checkoutViaWhatsApp">Checkout via WhatsApp</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { cart } from '../store/cart';

const customerName = ref('');
const shippingAddress = ref('');

const generateOrderId = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${dateStr}-${randomStr}`;
};

const checkoutViaWhatsApp = () => {
  if (!customerName.value.trim() || !shippingAddress.value.trim()) {
    alert('Please enter your Name and Shipping Address.');
    return;
  }

  const orderId = generateOrderId();
  let message = `*New Order: ${orderId}*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${customerName.value}\n`;
  message += `Address: ${shippingAddress.value}\n\n`;
  message += `*Order Items:*\n`;
  
  cart.state.items.forEach(item => {
    message += `- ${item.title} (${item.quantity}x) - ${item.price}\n`;
  });
  
  // message += `\nTotal: ${cart.totalPrice}`; // Add total if we can calculate it reliably
  message += "\n\nPlease provide payment details.";
  
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/6289684264364?text=${encodedMessage}`, '_blank');
};
</script>

<style scoped>
.cart-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: flex-end; /* Slide from right */
  z-index: 1060;
}

.cart-modal-content {
  background-color: white;
  width: 100%;
  max-width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0,0,0,0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.cart-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  line-height: 1;
}

.cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  margin-top: 50px;
  color: #777;
}

.cart-item {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f5f5f5;
  position: relative;
}

.item-image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 1rem;
  margin: 0 0 5px;
}

.item-price {
  color: #727272;
  font-weight: bold;
  margin-bottom: 10px;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-quantity button {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
}

.remove-button:hover {
  color: #ff4444;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid #eee;
}

.customer-details label {
  font-weight: bold;
  font-size: 0.9rem;
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  font-weight: bold;
}
</style>
