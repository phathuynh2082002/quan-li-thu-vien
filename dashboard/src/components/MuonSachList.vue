<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(muonSach, index) in muonSachs"
      :key="muonSach._id"
      :class="{ active: index === activeIndex, 'approved': muonSach.trangThai === 'daPheDuyet', 'borrowed': muonSach.trangThai === 'daMuon', 'returned': muonSach.trangThai === 'daTra' }"
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
.approved {
  border: 1px solid rgb(10, 237, 10);
}
.borrowed {
  border: 1px solid rgb(2, 232, 249);
}
.returned {
  border: 1px solid rgb(240, 17, 240);
}
</style>
