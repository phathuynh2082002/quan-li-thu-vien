<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(sach, index) in sachs"
      :key="sach._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ sach.tenSach }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    sachs: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: -1
    }
  },
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    }
  }
};
</script>

<style scoped>
/* Bổ sung CSS nếu cần thiết */
.active {
  background-color: lightblue;
  cursor: pointer;
}
</style>
