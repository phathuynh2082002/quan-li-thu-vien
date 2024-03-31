<template>
  <div v-if="sach" class="page">
    <h4>Mượn Sách</h4>
    <div class="form-group">
      <label for="name">Tên sách</label>
      <p name="name" class="form-control">{{ sach.tenSach }}</p>
    </div>
    <div class="form-group">
      <label for="image">Hình ảnh</label>
      <img name="image" class="mt-2" :src="sach.hinhAnh" alt="Hình ảnh sách" style="max-width: 100%;" />
    </div>
    <div class="form-group">
      <label for="nameDocGia">Tên độc giả</label>
      <p name="nameDocGia" class="form-control">{{ tenDocGia }}</p>
    </div>
    <div class="form-group">
      <label for="ngayMuon">Ngày mượn:</label>
      <input class="form-control" type="date" id="ngayMuon" v-model="ngayMuon" />
    </div>
    <div class="form-group">
      <label for="ngayTra">Ngày trả:</label>
      <input class="form-control" type="date" id="ngayTra" v-model="ngayTra" />
    </div>
    <button @click="muonSach" class="btn btn-primary">Mượn</button>
    <p>{{ message }}</p>
  </div>

</template>

<script>
import MuonSachService from "@/services/muonSach.service";
import DocGiaService from "@/services/docGia.service";
import SachService from "@/services/sach.service";

export default {
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      sach: null,
      tenDocGia: '',
      ngayMuon: '',
      ngayTra: '',
      message: "",
    };
  },
  methods: {
    async getSach(id) {
      try {
        this.sach = await SachService.get(id);
        this.getTenDocGia(); // Lấy thông tin tên độc giả
      } catch (error) {
        console.log(error);
        // Xử lý lỗi
      }
    },
    async getTenDocGia() {
      const id_docGia = localStorage.getItem('id_docGia'); // Lấy mã độc giả từ localStorage
      if (id_docGia) {
        try {
          const docGia = await DocGiaService.get(id_docGia);
          this.tenDocGia = `${docGia.hoLot} ${docGia.ten}`;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async muonSach() {
      // Kiểm tra ngày trả có hợp lệ không
      if (!this.ngayMuon || !this.ngayTra) {
        this.message = "Vui lòng nhập đầy đủ ngày mượn và ngày trả.";
        return;
      }

      const today = new Date();
      const borrowedDate = new Date(this.ngayMuon);
      const returnDate = new Date(this.ngayTra);

      if (returnDate <= borrowedDate || returnDate > new Date(today.setDate(today.getDate() + 30))) {
        this.message = "Ngày trả không hợp lệ.";
        return;
      }

      const data = {
        maSach: this.id,
        maDocGia: localStorage.getItem('id_docGia'),
        ngayMuon: this.ngayMuon,
        ngayTra: this.ngayTra,
      };

      try {
        console.log(data);
        await MuonSachService.create(data);
        this.message = "Sách đã được mượn thành công.";
      } catch (error) {
        console.log(error);
        // Xử lý lỗi
      }
    },
  },
  created() {
    this.getSach(this.id);
  },
};
</script>
