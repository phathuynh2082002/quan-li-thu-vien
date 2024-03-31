<template>
  <div class="page">
    <h4>Thêm</h4>
    <SachForm :sach="{}" @submit:sach="addSach"/>
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
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async addSach(data) {
      try {
        await SachService.create(data);
        this.message = "Liên hệ được tạo thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>