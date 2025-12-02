import { reactive, computed } from 'vue';

const state = reactive({
  items: [],
  isOpen: false
});

export const cart = {
  state,
  
  addToCart(product) {
    const existingItem = state.items.find(item => item.title === product.title);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.items.push({ ...product, quantity: 1 });
    }
    // Optional: Show a toast or notification here
    console.log('Added to cart:', product.title);
  },

  removeFromCart(index) {
    state.items.splice(index, 1);
  },

  updateQuantity(index, quantity) {
    if (quantity < 1) {
      this.removeFromCart(index);
    } else {
      state.items[index].quantity = quantity;
    }
  },

  clearCart() {
    state.items = [];
  },

  toggleCart() {
    state.isOpen = !state.isOpen;
  },

  openCart() {
    state.isOpen = true;
  },

  closeCart() {
    state.isOpen = false;
  },

  get totalItems() {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },

  get totalPrice() {
    return state.items.reduce((total, item) => {
      // Assuming price is a string like "$100.00" or "Rp 100.000"
      // We need to parse it. For now, let's try to extract digits.
      // If price is already a number, great.
      let price = 0;
      if (typeof item.price === 'string') {
        const numericString = item.price.replace(/[^0-9.]/g, '');
        price = parseFloat(numericString) || 0;
      } else {
        price = item.price;
      }
      return total + (price * item.quantity);
    }, 0);
  }
};
