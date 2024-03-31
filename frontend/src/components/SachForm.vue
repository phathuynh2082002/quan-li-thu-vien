<template>
  <Form @submit="submitSach" :validation-schema="sachFormSchema">
    <div class="form-group">
      <label for="name">Tên sách</label>
      <Field name="name" type="text" class="form-control" v-model="sachLocal.tenSach" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="image">Hình ảnh</label>
      <Field name="image" type="text" class="form-control" v-model="sachLocal.hinhAnh" />
      <ErrorMessage name="image" class="error-feedback" />
      <!-- Hiển thị hình ảnh -->
      <img v-if="sachLocal.hinhAnh" :src="sachLocal.hinhAnh" alt="Hình ảnh sách" class="mt-2"
        style="max-width: 100%;" />
    </div>
    <div class="form-group">
      <label for="author">Tác giả</label>
      <Field name="author" type="text" class="form-control" v-model="sachLocal.tacGia" />
      <ErrorMessage name="author" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="episodes">Số quyển</label>
      <Field name="episodes" type="number" class="form-control" v-model="sachLocal.soQuyen" />
      <ErrorMessage name="episodes" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="year">Năm xuất bản</label>
      <Field name="year" type="number" class="form-control" v-model="sachLocal.namXuatBan" />
      <ErrorMessage name="year" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="publisher">Nhà xuất bản</label>
      <Field name="publisher" v-model="sachLocal.maNhaXuatBan" as="select" class="form-control">
        <option v-for="publisher in publishers" :value="publisher._id">{{ publisher.tenNXB }}</option>
      </Field>
      <ErrorMessage name="publisher" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="price">Đơn giá</label>
      <Field name="price" type="number" class="form-control" v-model="sachLocal.donGia" />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button v-if="sachLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteSach">
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
  emits: ["submit:sach", "delete:sach"],
  props: {
    sach: { type: Object, required: true }
  },
  data() {
    const sachFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên sách không được bỏ trống.")
        .min(2, "Tên sách phải ít nhất 2 ký tự.")
        .max(100, "Tên sách có tối đa 100 ký tự."),
      image: yup.string().url("Hình ảnh không hợp lệ."),
      author: yup
        .string()
        .required("Tác giả không được bỏ trống.")
        .min(2, "Tác giả phải ít nhất 2 ký tự.")
        .max(100, "Tác giả có tối đa 100 ký tự."),
      episodes: yup
        .number()
        .required("Số quyển không được bỏ trống.")
        .min(1, "Số quyển phải lớn hơn 0."),
      year: yup
        .number()
        .required("Năm sản xuất không được bỏ trống.")
        .min(1000, "Năm sản xuất không hợp lệ."),
      publisher: yup.string().required("Nhà xuất bản không được bỏ trống."),
      price: yup
        .number()
        .required("Đơn giá không được bỏ trống.")
        .min(0, "Đơn giá phải lớn hơn hoặc bằng 0."),
    });
    return {
      sachLocal: this.sach,
      sachFormSchema,
      publishers: [],
    };
  },
  async created() {
    // Gọi phương thức để lấy danh sách nhà xuất bản khi component được tạo
    this.publishers = await nhaXuatBanService.getAll();
  },
  methods: {
    submitSach() {
      this.$emit("submit:sach", this.sachLocal);
    },
    deleteSach() {
      this.$emit("delete:sach", this.sachLocal.id);
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
