<template>
  <div class="page">
    <h4>Thêm</h4>
    <NhaXuatBanForm :nhaXuatBan="{}" @submit:nhaXuatBan="addNhaXuatBan"/>
    <p>{{ message }}</p>
  </div>
</template>
<script>
import NhaXuatBanForm from "@/components/NhaXuatBanForm.vue";
import NhaXuatBanService from "@/services/nhaXuatBan.service";
export default {
  components: {
    NhaXuatBanForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async addNhaXuatBan(data) {
      try {
        await NhaXuatBanService.create(data);
        this.message = "Nhà Xuất bản được tạo thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>