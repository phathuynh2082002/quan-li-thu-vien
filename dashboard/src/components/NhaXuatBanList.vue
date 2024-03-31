<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(nhaXuatBan, index) in nhaXuatBans"
      :key="nhaXuatBan._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ nhaXuatBan.tenNXB }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    nhaXuatBans: {
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
