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
      <MuonSachList v-if="filteredMuonSachsCount > 0" :muonSachs="filteredMuonSachs"
        v-model:activeIndex="activeIndex" />
      <p v-else>Không có lượt mượn sách nào.</p>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeMuonSach">
        <h4>
          Theo dõi mượn sách
          <i class="fas fa-address-card"></i>
        </h4>
        <MuonSachCard :muonSach="activeMuonSach" />
        <button v-if="activeMuonSach.trangThai != 'daTra'" class="mt-2 btn btn-warning"
          @click="updateMuonSach(activeMuonSach._id)">
          <i class="fas fa-edit"></i> {{ buttonText }}
        </button>
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
      muonSachs: [],
      activeIndex: -1,
      searchText: "",
      filteredMuonSachs: [],
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    muonSachStrings() {
      return this.muonSachs.map((muonSach) => {
        const { maSach, maDocGia, maNhanVien, ngayMuon, ngayTra, trangThai } = muonSach;
        return [maSach, maDocGia, maNhanVien, ngayMuon, ngayTra, trangThai].join("");
      });
    },
    activeMuonSach() {
      if (this.activeIndex < 0) return null;
      return this.filteredMuonSachs[this.activeIndex];
    },
    filteredMuonSachsCount() {
      return this.filteredMuonSachs.length;
    },
    buttonText() {
      if (this.activeMuonSach) {
        switch (this.activeMuonSach.trangThai) {
          case 'choPheDuyet':
            return 'Phê Duyệt';
          case 'daPheDuyet':
            return 'Đánh dấu đã mượn';
          case 'daMuon':
            return 'Đánh dấu đã trả';
          default:
            return '';
        }
      } else {
        return '';
      }
    }
  },
  methods: {
    filterMuonSachs(trangThai) {
      if (trangThai === '') {
        this.filteredMuonSachs = [...this.muonSachs]; // Lấy lại toàn bộ danh sách nếu chọn 'Tất cả'
      } else {
        this.filteredMuonSachs = this.muonSachs.filter(muonSach => muonSach.trangThai === trangThai);
      }
    },
    async retrieveMuonSachs() {
      try {
        this.muonSachs = await muonSachService.getAll();
        this.filteredMuonSachs = [...this.muonSachs];
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveMuonSachs();
      this.activeIndex = -1;
    },
    async updateMuonSach(muonSachId) {
      try {
        const maNhanVien = localStorage.getItem("id_nhanVien");
        const statusMap = {
          'choPheDuyet': 'daPheDuyet',
          'daPheDuyet': 'daMuon',
          'daMuon': 'daTra'
        };
        const currentStatus = this.activeMuonSach.trangThai;
        const newStatus = statusMap[currentStatus];
        if (newStatus) {
          await muonSachService.update(muonSachId, { maNhanVien, trangThai: newStatus });
          this.refreshList();
        } else {
          console.log('Không thể thay đổi trạng thái');
        }
      } catch (error) {
        console.log(error);
      }
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
