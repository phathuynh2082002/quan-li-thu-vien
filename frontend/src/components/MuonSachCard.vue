<template>
  <div>
    <div class="p-1">
      <strong>Tên sách:</strong>
      {{ tenSach }}
    </div>
    <div class="p-1">
      <strong>Tên độc giả:</strong>
      {{ tenDocGia }}
    </div>
    <div v-if="muonSach.maNhanVien" class="p-1">
      <strong>Tên nhân viên:</strong>
      {{ tenNhanVien }}
    </div>
    <div class="p-1">
      <strong>Ngày mượn:</strong>
      {{ muonSach.ngayMuon }}
    </div>
    <div class="p-1">
      <strong>Ngày trả:</strong>
      {{ muonSach.ngayTra }}
    </div>
    <div class="p-1">
      <strong>Đã phê duyệt:</strong>
      <span v-if="muonSach.pheDuyet" style="color: green">&#10003;</span>
      <span v-else style="color: red">&#10007;</span>
    </div>
  </div>
</template>


<script>
import sachService from '@/services/sach.service';
import docGiaService from '@/services/docGia.service';
import nhanVienService from '@/services/nhanVien.service';

export default {
  props: {
    muonSach: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tenSach: '',
      tenDocGia: '',
      tenNhanVien: ''
    };
  },
  async created() {
    const sach = await sachService.get(this.muonSach.maSach);
    if (sach) {
      this.tenSach = sach.tenSach;
    }

    const docGia = await docGiaService.get(this.muonSach.maDocGia);
    if (docGia) {
      this.tenDocGia = `${docGia.hoLot} ${docGia.ten}`;
    }

    if (this.muonSach.maNhanVien) {
      const nhanVien = await nhanVienService.get(this.muonSach.maNhanVien);
      if (nhanVien) {
        this.tenNhanVien = nhanVien.hoTenNV;
      }
    }
  }
};
</script>

<style scoped>
/* Bổ sung CSS nếu cần thiết */
</style>
