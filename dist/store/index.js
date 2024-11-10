"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/store/index.js
const vuex_1 = require("vuex");
const store = (0, vuex_1.createStore)({
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
        fetchUser(_a) {
            return __awaiter(this, arguments, void 0, function* ({ commit }) {
                try {
                    // Simulate an API call
                    const user = { id: 1, name: 'John Doe' }; // Replace with real API response in practice
                    commit('setUser', user);
                }
                catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            });
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
exports.default = store;
//# sourceMappingURL=index.js.map