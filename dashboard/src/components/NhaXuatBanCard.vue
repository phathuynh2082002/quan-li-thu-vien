<template>
  <div>
    <div class="p-1">
      <strong>Tên nhà xuất bản:</strong>
      {{ nhaXuatBan.tenNXB }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ nhaXuatBan.diaChi }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    nhaXuatBan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>
/* Bổ sung CSS nếu cần thiết */
</style>
