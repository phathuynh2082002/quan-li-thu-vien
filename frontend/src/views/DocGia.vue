<template>
  <Form :validation-schema="docGiaFormSchema">
    <div class="form-group">
      <label for="hoLot">Họ và tên lót</label>
      <Field name="hoLot" type="text" class="form-control" v-model="docGia.hoLot" />
      <ErrorMessage name="hoLot" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="ten">Tên</label>
      <Field name="ten" type="text" class="form-control" v-model="docGia.ten" />
      <ErrorMessage name="ten" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phai">Giới Tính</label>
      <Field name="phai" type="text" class="form-control" as="select" v-model="docGia.phai">
        <option :value="Nam">Nam</option>
        <option :value="Nữ">Nữ</option>
      </Field>
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
      <button type="button" class="ml-2 btn btn-danger" @click="updateDocGia">
        Lưu
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
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
        hoLot: yup.string().required("Họ và tên lót không được bỏ trống."),
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
  async created() {
    const id_docGia = localStorage.getItem("id_docGia");
    if (id_docGia) {
      try {
        // Gọi service để lấy thông tin độc giả
        this.docGia = await docGiaService.get(id_docGia);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin độc giả:", error);
        alert("Đã xảy ra lỗi khi lấy thông tin độc giả.");
      }
    }
  },
  methods: {
    async updateDocGia() {
      try {
        // Gọi service để cập nhật thông tin độc giả
        await docGiaService.update(this.docGia._id, this.docGia);
        // Thông báo thành công nếu cập nhật thành công
        alert("Cập nhật thông tin độc giả thành công!");
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi cập nhật thông tin độc giả:", error);
        alert("Đã xảy ra lỗi khi cập nhật thông tin độc giả.");
      }
    },
  },
};
</script>

<style scoped>
/* Bổ sung CSS nếu cần thiết */
</style>
