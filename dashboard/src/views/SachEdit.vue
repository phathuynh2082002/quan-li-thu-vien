<template>
  <div v-if="sach" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <SachForm :sach="sach" @submit:sach="updateSach" @delete:sach="deleteSach" />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import SachForm from "@/components/SachForm.vue";
import SachService from "@/services/sach.service";
export default {
  components: {
    SachForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      sach: null,
      message: "",
    };
  },
  methods: {
    async getSach(id) {
      try {
        this.sach = await SachService.get(id);
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
    async updateSach(data) {
      try {
        await SachService.update(this.sach._id, data);
        this.message = "Sách được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSach() {
      if (confirm("Bạn muốn xóa Sách này?")) {
        try {
          await SachService.delete(this.sach._id);
          this.$router.push({ name: "Libary" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getSach(this.id);
    this.message = "";
  },
};
</script>