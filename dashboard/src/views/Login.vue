<template>
  <div>
    <Form @submit="submitLoginForm" :validation-schema="loginFormSchema">
      <div class="form-group">
        <label for="phone">Số điện thoại</label>
        <Field name="phone" type="tel" class="form-control" v-model="loginData.phone" />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <Field name="password" type="password" class="form-control" v-model="loginData.password" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Đăng nhập</button>
      </div>
    </Form>

    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NhanVienService from "@/services/nhanVien.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      loginData: {
        phone: "",
        password: "",
      },
      loginFormSchema: yup.object().shape({
        phone: yup
          .string()
          .required("Vui lòng nhập số điện thoại.")
          .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
        password: yup.string().required("Vui lòng nhập mật khẩu."),
      }),
      message: "", // Thêm biến message để lưu thông báo
    };
  },
  methods: {
    async submitLoginForm() {
      try {
        const { phone, password } = this.loginData;
        const { nhanVien } = await NhanVienService.login(phone, password);
        localStorage.setItem("id_nhanVien", nhanVien);
        this.$emit("loginSuccess", nhanVien);
        // Thiết lập thông báo thành công
        this.message = "Đăng nhập thành công";
        this.$router.push({ name: "Libary" });
      } catch (error) {
        this.message = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
.message {
  margin-top: 10px;
  color: red;
}
</style>
