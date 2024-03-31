<template>
  <Form @submit="submitNhaXuatBan" :validation-schema="nhaXuatBanFormSchema">
    <div class="form-group">
      <label for="name">Tên Nhà Xuất Bản</label>
      <Field name="name" type="text" class="form-control" v-model="nhaXuatBanLocal.tenNXB" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="diaChi">Địa Chỉ</label>
      <Field name="diaChi" type="text" class="form-control" v-model="nhaXuatBanLocal.diaChi" />
      <ErrorMessage name="diaChi" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button v-if="nhaXuatBanLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteNhaXuatBan">
        Xóa
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import nhaXuatBanService from "@/services/nhaXuatBan.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:nhaXuatBan", "delete:nhaXuatBan"],
  props: {
    nhaXuatBan: { type: Object, required: true }
  },
  data() {
    const nhaXuatBanFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên nhà xuất bản không được bỏ trống.")
        .min(2, "Tên nhà xuất bản phải ít nhất 2 ký tự.")
        .max(100, "Tên nhà xuất bản có tối đa 100 ký tự."),
      diaChi: yup
        .string()
        .required("Địa Chỉ không được bỏ trống.")
        .min(2, "Địa Chỉ phải ít nhất 2 ký tự.")
        .max(100, "Địa Chỉ có tối đa 100 ký tự."),
    });
    return {
      nhaXuatBanLocal: this.nhaXuatBan,
      nhaXuatBanFormSchema,
      publishers: [],
    };
  },
  async created() {
    // Gọi phương thức để lấy danh sách nhà xuất bản khi component được tạo
    this.publishers = await nhaXuatBanService.getAll();
  },
  methods: {
    submitNhaXuatBan() {
      this.$emit("submit:nhaXuatBan", this.nhaXuatBanLocal);
    },
    deleteNhaXuatBan() {
      this.$emit("delete:nhaXuatBan", this.nhaXuatBanLocal.id);
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
