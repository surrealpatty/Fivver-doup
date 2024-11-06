// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    // State properties
    user: null, // Holds user information
    products: [], // List of products
  },
  mutations: {
    // Mutation to set user
    setUser(state, user) {
      state.user = user;
    },
    // Mutation to add a product to the list
    addProduct(state, product) {
      state.products.push(product);
    },
    // Mutation to remove a product by ID
    removeProduct(state, productId) {
      state.products = state.products.filter(product => product.id !== productId);
    },
  },
  actions: {
    // Async action to simulate fetching user data
    async fetchUser({ commit }) {
      try {
        // Simulate an API call
        const user = { id: 1, name: 'John Doe' }; // Replace with real API response in practice
        commit('setUser', user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    },
    // Action to add a new product
    addNewProduct({ commit }, product) {
      commit('addProduct', product);
    },
    // Action to remove a product
    deleteProduct({ commit }, productId) {
      commit('removeProduct', productId);
    },
  },
  modules: {
    // Define other modules here if needed
  },
});

export default store;
