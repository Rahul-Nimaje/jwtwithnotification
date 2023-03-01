import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    User: {
      token: null,
      username: null,
      email: null,

    }
  },
  getters: {
    accessToken: (state) => {
      return state.User.token;
    },
    isAuthenticated: (state) => {

      return !!state.User.token;

    },
  },
  mutations: {
    User(state, data) {
      console.log("data...........", data)
      state.User.token = data.accessToken
      state.User.username = data.username
      state.User.email = data.email
      console.log("state........", state)
    }
  },
  actions: {
    User({ commit }, data) {
      console.log("userdata.........", data)
      commit("User", data);
    },
    logoutUser({ commit }, data) {
      commit("User", data);
    }
  },

})
