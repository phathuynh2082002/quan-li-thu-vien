<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Mượn Sách
        <i class="fa-solid fa-book"></i>
      </h4>
      <!-- Dropdown để lọc danh sách -->
      <div class="form-group">
        <label for="filterSelect">Bộ lọc:</label>
        <select class="form-control" id="filterSelect" @change="filterMuonSachs($event.target.value)">
          <option value="">Tất cả</option>
          <option value="choPheDuyet">Chờ phê duyệt</option>
          <option value="daPheDuyet">Đã phê duyệt</option>
          <option value="daMuon">Đã mượn</option>
          <option value="daTra">Đã trả</option>
        </select>
      </div>
      <!-- Danh sách mượn sách -->
      <MuonSachList v-if="filteredMuonSachsCount > 0" :muonSachs="filteredMuonSachs" v-model:activeIndex="activeIndex" />
      <p v-else>Không có lượt mượn sách nào.</p>
    </div>
    <div class="mt-3 col-md-6">
      <!-- Chi tiết mượn sách -->
      <div v-if="activeMuonSach">
        <h4>
          Theo dõi mượn sách
          <i class="fas fa-address-card"></i>
        </h4>
        <MuonSachCard :muonSach="activeMuonSach" />
      </div>
    </div>
  </div>
</template>

<script>
import MuonSachCard from "@/components/MuonSachCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import MuonSachList from "@/components/MuonSachList.vue";
import muonSachService from "@/services/muonSach.service";

export default {
  components: {
    MuonSachCard,
    InputSearch,
    MuonSachList,
  },
  data() {
    return {
      muonSachs: [], // Danh sách gốc
      filteredMuonSachs: [], // Danh sách lọc
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Tính toán chuỗi dùng để tìm kiếm
    muonSachStrings() {
      return this.muonSachs.map((muonSach) => {
        const { maSach, maDocGia, maNhanVien, ngayMuon, ngayTra, pheDuyet } = muonSach;
        return [maSach, maDocGia, maNhanVien, ngayMuon, ngayTra, pheDuyet].join("");
      });
    },
    // Số lượng mượn sách sau khi lọc
    filteredMuonSachsCount() {
      return this.filteredMuonSachs.length;
    },
    // Mượn sách được chọn
    activeMuonSach() {
      if (this.activeIndex < 0) return null;
      return this.filteredMuonSachs[this.activeIndex];
    },
  },
  methods: {
    // Lọc danh sách mượn sách dựa trên trạng thái
    filterMuonSachs(trangThai) {
      if (trangThai === '') {
        this.filteredMuonSachs = [...this.muonSachs]; // Lấy lại toàn bộ danh sách nếu chọn 'Tất cả'
      } else {
        this.filteredMuonSachs = this.muonSachs.filter(muonSach => muonSach.trangThai === trangThai);
      }
    },
    // Lấy danh sách mượn sách từ API
    async retrieveMuonSachs() {
      try {
        const maDocGia = localStorage.getItem('id_docGia');
        this.muonSachs = await muonSachService.getMuonSach(maDocGia);
        this.filteredMuonSachs = [...this.muonSachs]; // Tạo một bản sao của danh sách gốc
      } catch (error) {
        console.log(error);
      }
    },
    // Làm mới danh sách mượn sách
    refreshList() {
      this.retrieveMuonSachs();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
