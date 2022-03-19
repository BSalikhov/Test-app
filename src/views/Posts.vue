<template>
  <div>
    <div
      v-if="loading"
      class="w-screen h-screen flex items-center justify-center bg-black bg-opacity-40"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="animate-spin h-10 w-10 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </div>

    <div
      v-else
      class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
    >
      <div class="absolute inset-0">
        <div class="bg-white h-1/3 sm:h-2/3"></div>
      </div>

      <div class="relative max-w-7xl mx-auto">
        <div class="text-center">
          <h2
            class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl"
          >
            Blogs from test API
          </h2>

          <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            libero labore natus atque, ducimus sed.
          </p>
        </div>

        <div
          class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none"
        >
          <div
            v-for="post in postsPerPage"
            :key="post.id"
            class="flex flex-col rounded-lg shadow-lg overflow-hidden"
          >
            <div class="flex-shrink-0">
              <img
                class="h-48 w-full object-cover"
                src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
                alt=""
              />
            </div>

            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <p class="text-sm font-medium text-indigo-600">
                  <a href="#" class="hover:underline"> Article </a>
                </p>

                <router-link
                  :to="{
                    name: 'post-details',
                    params: { id: post.id },
                  }"
                  class="block mt-2 group"
                >
                  <p
                    class="text-xl font-semibold text-gray-900 pb-1 border-b-2 border-transparent group-hover:border-b-2 group-hover:border-indigo-600 duration-300"
                  >
                    {{ post.title }}
                  </p>

                  <p class="mt-2 text-base text-gray-500">
                    {{ post.body }}
                  </p>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <Pagination
          class="mt-4"
          v-if="posts && posts.length && posts.length > offset"
          v-model="page"
          :length="lastPage"
          :offset="9"
          :items-count="posts.length"
          @input="(value) => pageChanged(value)"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Pagination from "@/components/Pagination";

export default {
  name: "Blogs",

  components: {
    Pagination,
  },

  data() {
    return {
      offset: 9,
      page: 1,
    };
  },

  computed: {
    ...mapState({
      posts: (state) => state.posts,
      loading: (state) => state.loading,
    }),

    postsPerPage() {
      return this.posts.slice(
        (this.page - 1) * this.offset,
        this.page * this.offset
      );
    },

    lastPage() {
      return Math.ceil(this.posts.length / this.offset);
    },
  },

  methods: {
    pageChanged(page) {
      this.page = page;
      this.$router.push({ query: { page: page } });
    },
  },

  watch: {
    "$route.query.page": {
      handler() {
        this.page = this.$route.query.page;
      },
      immediate: true,
    },
  },
};
</script>
