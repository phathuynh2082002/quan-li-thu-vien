<template>
  <div>
    <div class="p-1">
      <strong>Tên sách:</strong>
      {{ sach.tenSach }}
    </div>
    <div class="p-1">
      <strong>Hình ảnh:</strong>
      <img :src="sach.hinhAnh" alt="Sach Image" class="sach-image">
    </div>
    <div class="p-1">
      <strong>Số quyển:</strong>
      {{ sach.soQuyen }}
    </div>
    <div class="p-1">
      <strong>Đơn giá:</strong>
      {{ sach.donGia }}
    </div>
    <div class="p-1">
      <strong>Tác giả:</strong>
      {{ sach.tacGia }}
    </div>
    <div class="p-1">
      <strong>Nhà xuất bản:</strong>
      {{ publisherName }}
    </div>
    <div class="p-1">
      <strong>Năm sản xuất:</strong>
      {{ sach.namXuatBan }}
    </div>
  </div>
</template>

<script>
import nhaXuatBanService from '@/services/nhaXuatBan.service';

export default {
  props: {
    sach: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      publisherName: '' // Tên nhà xuất bản
    };
  },
  async created() {
    // Gọi phương thức để lấy thông tin của nhà xuất bản từ id
    const publisherId = this.sach.maNhaXuatBan; // Giả sử sach.maNhaXuatBan chứa id của nhà xuất bản
    const publisher = await nhaXuatBanService.get(publisherId);
    if (publisher) {
      this.publisherName = publisher.tenNXB; // Gán tên nhà xuất bản vào biến publisherName
    } else {
      this.publisherName = 'Không tìm thấy'; // Nếu không tìm thấy nhà xuất bản, gán giá trị mặc định
    }
  }
};
</script>

<style scoped>
/* Bổ sung CSS nếu cần thiết */
.sach-image {
  max-width: 100%;
  height: auto;
}
</style>
