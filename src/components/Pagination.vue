<template>
  <div
    class="w-full bg-white inline-flex shadow-lg items-center justify-between p-4 border-t border-gray-200 sm:px-6 rounded-b-lg"
  >
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ (value - 1) * offset + 1 }}</span>
        to
        <span class="font-medium">{{
          value * offset > itemsCount ? itemsCount : value * offset
        }}</span>
        of
        <span class="font-medium">{{ itemsCount }}</span>
        results
      </p>
    </div>

    <div>
      <nav
        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          type="button"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          :disabled="Number(value) === 1"
          @click="$emit('input', +value - 1)"
        >
          <span class="sr-only">Previous</span>

          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <template v-if="section > 1">
          <button
            type="button"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="
              Number(value) === 1
                ? 'z-10 bg-indigo-100 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            @click="$emit('input', 1)"
          >
            1
          </button>
          <span
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            @click="goBackwardSection"
          >
            ...
          </span>
        </template>

        <button
          v-for="page in pages"
          :key="page"
          type="button"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          :class="
            page === Number(value)
              ? 'z-10 bg-indigo-100 border-indigo-500 text-indigo-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
          "
          @click="$emit('input', page)"
        >
          {{ page }}
        </button>
        <template v-if="section < sections">
          <span
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            @click="goForwardSection"
          >
            ...
          </span>
          <button
            type="button"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="
              Number(value) === length
                ? 'z-10 bg-indigo-100 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            @click="$emit('input', length)"
          >
            {{ length }}
          </button>
        </template>

        <button
          type="button"
          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          :disabled="Number(value) >= length"
          @click="$emit('input', +value + 1)"
        >
          <span class="sr-only">Next</span>

          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import range from "lodash.range";

export default {
  name: "Pagination",

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    length: {
      type: Number,
      default: 1,
    },
    itemsCount: {
      type: Number,
      default: 1,
    },
    totalVisible: {
      type: Number,
      default: 3,
    },
    offset: {
      type: Number,
      default: 9,
    },
  },
  data: () => ({
    offsetList: [5, 10, 15, 50],
  }),

  computed: {
    sections() {
      return Math.ceil(this.length / this.totalVisible);
    },

    section() {
      return Math.ceil(this.value / this.totalVisible);
    },

    pages() {
      return range(
        (this.section - 1) * this.totalVisible + 1,
        this.lastPage + 1
      );
    },

    lastPage() {
      let last = (this.section - 1) * this.totalVisible + this.totalVisible;

      if (this.section === this.sections) {
        last = this.length;
      }

      return last;
    },
  },

  methods: {
    goForwardSection() {
      this.$emit("input", this.firstPageOfSection(this.section + 1));
    },

    goBackwardSection() {
      this.$emit("input", this.lastPageOfSection(this.section - 1));
    },

    firstPageOfSection(section) {
      return (section - 1) * this.totalVisible + 1;
    },

    lastPageOfSection(section) {
      return this.firstPageOfSection(section) + this.totalVisible - 1;
    },
  },
};
</script>
