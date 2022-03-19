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

    <div v-else>
      <img
        class="h-64 slg:h-96 w-full object-cover"
        src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
      />
      <div
        v-if="post"
        class="relative pt-6 pb-20 px-4 sm:px-6 lg:pt-10 lg:pb-28 lg:px-8"
      >
        <p class="text-sm font-medium text-indigo-600 mb-2">
          <a href="#" class="hover:underline"> Article </a>
        </p>
        <h2 class="text-2xl lg:text-4xl font-bold">
          {{ post.title }}
        </h2>

        <p class="lg:text-lg text-gray-600 font-light mt-8">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PostDetails",

  data: () => ({
    post: {},
  }),

  computed: {
    ...mapState({
      loading: (state) => state.loading,
    }),
  },

  mounted() {
    this.post = this.$store.state.posts.find(
      (item) => item.id === +this.$route.params.id
    );
  },
};
</script>
