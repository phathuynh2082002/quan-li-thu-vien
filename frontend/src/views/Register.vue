<template>
  <Form :validation-schema="docGiaFormSchema">
    <div class="form-group">
      <label for="hoLot">Họ lót</label>
      <Field name="hoLot" type="text" class="form-control" v-model="docGia.hoLot" />
      <ErrorMessage name="hoLot" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="ten">Tên</label>
      <Field name="ten" type="text" class="form-control" v-model="docGia.ten" />
      <ErrorMessage name="ten" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phai">Phái</label>
      <Field name="phai" type="text" class="form-control" v-model="docGia.phai" />
      <ErrorMessage name="phai" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="ngaySinh">Ngày sinh</label>
      <Field name="ngaySinh" type="date" class="form-control" v-model="docGia.ngaySinh" />
      <ErrorMessage name="ngaySinh" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="diaChi">Địa chỉ</label>
      <Field name="diaChi" type="text" class="form-control" v-model="docGia.diaChi" />
      <ErrorMessage name="diaChi" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="dienThoai">Số điện thoại</label>
      <Field name="dienThoai" type="number" class="form-control" v-model="docGia.dienThoai" />
      <ErrorMessage name="dienThoai" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <Field name="password" type="password" class="form-control" v-model="docGia.password" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <button type="button" class="ml-2 btn btn-primary" @click="registerDocGia">
        Đăng ký
      </button>
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import docGiaService from "@/services/docGia.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      docGia: {
        hoLot: "",
        ten: "",
        phai: "",
        ngaySinh: "",
        diaChi: "",
        dienThoai: "",
        password: "",
      },
      docGiaFormSchema: yup.object().shape({
        hoLot: yup.string().required("Họ lót không được bỏ trống."),
        ten: yup.string().required("Tên không được bỏ trống."),
        phai: yup.string().required("Phái không được bỏ trống."),
        ngaySinh: yup.date().required("Ngày sinh không được bỏ trống."),
        diaChi: yup.string().required("Địa chỉ không được bỏ trống."),
        dienThoai: yup
          .number()
          .required("Số điện thoại không được bỏ trống.")
          .positive("Số điện thoại phải là số dương."),
        password: yup.string().required("Mật khẩu không được bỏ trống."),
      }),
    };
  },
  methods: {
    async registerDocGia() {
      try {
        console.log(this.docGia);
        const docGia = await docGiaService.create(this.docGia);
        // Thông báo thành công nếu tạo tài khoản thành công
        localStorage.setItem("id_docGia", docGia._id);
        alert("Đăng ký thành công!");
        // Sau khi đăng ký, bạn có thể chuyển hướng người dùng đến trang khác
      } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        alert(error.response.data.message);
      }
    },
  },
};
</script>

<style>
/* Bổ sung CSS nếu cần thiết */
</style>
