import { createStore } from 'vuex';

const store = createStore({
  state: {
    // Define your state properties
    user: null, // Example state property to store user information
    products: [], // Example state property to store a list of products
  },
  mutations: {
    // Define your mutations
    setUser(state, user) {
      state.user = user; // Sets the user state
    },
    addProduct(state, product) {
      state.products.push(product); // Adds a product to the products array
    },
    removeProduct(state, productId) {
      state.products = state.products.filter(product => product.id !== productId); // Removes a product by ID
    },
  },
  actions: {
    // Define your actions
    fetchUser({ commit }) {
      // Simulated async operation (e.g., API call)
      const user = { id: 1, name: 'John Doe' }; // Simulated fetched user data
      commit('setUser', user); // Commit mutation to set user
    },
    addNewProduct({ commit }, product) {
      commit('addProduct', product); // Commit mutation to add a new product
    },
    deleteProduct({ commit }, productId) {
      commit('removeProduct', productId); // Commit mutation to remove a product
    },
  },
  modules: {
    // Define modules if needed
  },
});

export default store;
