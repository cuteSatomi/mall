import Vue from "vue";
import Vuex from "vuex"
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: [],
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++;
    },
    addToCart(state, payload) {
      state.cartList.push(payload);
    }
  },
  actions: {
    addToCart(context, payload) {
      /*let oldProduct = null;
      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }*/

      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        // oldProduct.count++;
        context.commit("addCounter", oldProduct);
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit("addToCart", payload);
      }
    }
  },
  getters
});

export default store;

