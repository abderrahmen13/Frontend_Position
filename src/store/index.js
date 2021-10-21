import { createStore } from "vuex";

//Set products from cart to LocalStorage
function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export default createStore({
  state: {
    cart: []
  },
  getters: {
    //Get all products in cart
    cartItems: (state) => {
      return state.cart
    }
  },
  mutations: {
    //Add product to cart
    addToCart (state, product) {
      let item = state.cart.find( i => i.id === product.id)
      if (!item) {
        state.cart.push({...product})
      }
      updateLocalStorage(state.cart)
    },
    //Remove product from cart
    removeFromCart (state, product) {
      let item = state.cart.find( i => i.id === product.id)
      if (item) {
        state.cart = state.cart.filter(i => i.id !== product.id)
      }
      updateLocalStorage(state.cart)
    },
    //Update cart from LocalStorage
    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem('cart')
      if (cart) {
        state.cart = JSON.parse(cart)
      }
    }
  },
  actions: {},
  modules: {}
});
