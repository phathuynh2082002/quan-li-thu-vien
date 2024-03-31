<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Nhà Xuất Bản
        <i class="fa-solid fa-book-bible"></i>
      </h4>
      <NhaXuatBanList v-if="filteredNhaXuatBansCount > 0" :nhaXuatBans="filteredNhaXuatBans" v-model:activeIndex="activeIndex" />
      <p v-else>Không có nhà xuất bản nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddNhaXuatBan">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllNhaXuatBans">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeNhaXuatBan">
        <h4>
          Chi tiết Nhà Xuất Bản
          <i class="fas fa-address-card"></i>
        </h4>
        <NhaXuatBanCard :nhaXuatBan="activeNhaXuatBan" />
        <router-link :to="{
          name: 'nhaXuatBan.edit',
          params: { id: activeNhaXuatBan._id },
        }">
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import NhaXuatBanCard from "@/components/NhaXuatBanCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import NhaXuatBanList from "@/components/NhaXuatBanList.vue";
import nhaXuatBanService from "@/services/nhaXuatBan.service";
export default {
  components: {
    NhaXuatBanCard,
    InputSearch,
    NhaXuatBanList,
  },
  data() {
    return {
      nhaXuatBans: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng nhaXuatBan thành chuỗi để tiện cho tìm kiếm.
    nhaXuatBanStrings() {
      return this.nhaXuatBans.map((nhaXuatBan) => {
        const { tenNhaXuatBan, hinhAnh, tacGia, soQuyen, namXuatBan, maNhaXuatBan, donGia } = nhaXuatBan;
        return [tenNhaXuatBan, hinhAnh, tacGia, soQuyen, namXuatBan, maNhaXuatBan, donGia].join("");
      });
    },
    // Trả về các nhaXuatBan có chứa thông tin cần tìm kiếm.
    filteredNhaXuatBans() {
      if (!this.searchText) return this.nhaXuatBans;
      return this.nhaXuatBans.filter((_nhaXuatBan, index) =>
        this.nhaXuatBanStrings[index].includes(this.searchText)
      );
    },
    activeNhaXuatBan() {
      if (this.activeIndex < 0) return null;
      console.log(this.filteredNhaXuatBans[this.activeIndex]);
      return this.filteredNhaXuatBans[this.activeIndex];
    },
    filteredNhaXuatBansCount() {
      return this.filteredNhaXuatBans.length;
    },
  },
  methods: {
    async retrieveNhaXuatBans() {
      try {
        this.nhaXuatBans = await nhaXuatBanService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveNhaXuatBans();
      this.activeIndex = -1;
    },
    async removeAllNhaXuatBans() {
      if (confirm("Bạn muốn xóa tất cả Nhà Xuất Bản này?")) {
        try {
          await NhaXuatBanService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddNhaXuatBan() {
      this.$router.push({ name: "nhaXuatBan.add" });
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
