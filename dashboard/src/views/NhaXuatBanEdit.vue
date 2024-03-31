<template>
  <div v-if="nhaXuatBan" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <NhaXuatBanForm :nhaXuatBan="nhaXuatBan" @submit:nhaXuatBan="updateNhaXuatBan" @delete:nhaXuatBan="deleteNhaXuatBan" />
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
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      nhaXuatBan: null,
      message: "",
    };
  },
  methods: {
    async getNhaXuatBan(id) {
      try {
        this.nhaXuatBan = await NhaXuatBanService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1)
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateNhaXuatBan(data) {
      try {
        await NhaXuatBanService.update(this.nhaXuatBan._id, data);
        this.message = "Nhà Xuất Bản được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNhaXuatBan() {
      if (confirm("Bạn muốn xóa Nhà Xuất Bản này?")) {
        try {
          await NhaXuatBanService.delete(this.nhaXuatBan._id);
          this.$router.push({ name: "NhaXuatBan" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getNhaXuatBan(this.id);
    this.message = "";
  },
};
</script>