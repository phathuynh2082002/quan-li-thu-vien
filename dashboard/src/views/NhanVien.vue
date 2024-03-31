<template>
  <Form :validation-schema="nhanVienFormSchema">
    <div class="form-group">
      <label for="name">Họ Và Tên Nhân Viên</label>
      <Field name="name" type="text" class="form-control" v-model="nhanVien.hoTenNV" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="chucVu">Chức Vụ</label>
      <Field name="chucVu" type="text" class="form-control" v-model="nhanVien.chucVu" />
      <ErrorMessage name="chucVu" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="diaChi">Địa Chỉ</label>
      <Field name="diaChi" type="text" class="form-control" v-model="nhanVien.diaChi" />
      <ErrorMessage name="diaChi" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="soDienThoai">Số Điện Thoại</label>
      <Field name="soDienThoai" type="number" class="form-control" v-model="nhanVien.soDienThoai" />
      <ErrorMessage name="soDienThoai" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <Field name="password" type="password" class="form-control" v-model="nhanVien.password" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <button type="button" class="ml-2 btn btn-danger" @click="updateNhanVien">
        Lưu
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import nhanVienService from "@/services/nhanVien.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const nhanVienFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên nhân viên không được bỏ trống."),
      diaChi: yup
        .string()
        .required("Địa chỉ không được bỏ trống."),
      chucVu: yup
        .string()
        .required("Chức Vụ không được bỏ trống."),
      soDienThoai: yup
        .number()
        .required("Số điện thoại không được bỏ trống.")
        .min(1, "Số điện thoại phải lớn hơn 0."),
      password: yup
        .string()
        .required("Password không được bỏ trống."),
    });
    return {
      nhanVien: {
        _id: "",
        hoTenNV: "",
        chucVu: "",
        diaChi: "",
        soDienThoai: "",
        password: "",
      },
      nhanVienFormSchema,
    };
  },
  async created() {
    const idNhanVien = localStorage.getItem("id_nhanVien");
    if (idNhanVien) {
      // Nếu có id_nhân_viên, gọi service để lấy thông tin nhân viên
      this.nhanVien = await nhanVienService.get(idNhanVien);
    }
  },
  methods: {
    async updateNhanVien() {
      try {
        // Gọi service để cập nhật thông tin nhân viên
        await nhanVienService.update(this.nhanVien._id, this.nhanVien);
        // Thông báo thành công nếu cập nhật thành công
        alert("Cập nhật thông tin nhân viên thành công!");
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi cập nhật thông tin nhân viên:", error);
        alert("Đã xảy ra lỗi khi cập nhật thông tin nhân viên.");
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
