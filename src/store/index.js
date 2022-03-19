import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async getPosts({ commit }, params) {
      commit("setLoading", true);
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params,
        }
      );
      commit("setPosts", data);
      commit("setLoading", false);
    },
  },
  modules: {},
});
