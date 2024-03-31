<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(muonSach, index) in muonSachs"
      :key="muonSach._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ muonSach.ngayMuon }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    muonSachs: {
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
