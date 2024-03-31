<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Thư Viện
        <i class="fa-solid fa-book"></i>
      </h4>
      <SachList v-if="filteredSachsCount > 0" :sachs="filteredSachs" v-model:activeIndex="activeIndex" />
      <p v-else>Không có sách nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddSach">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllSachs">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeSach">
        <h4>
          Chi tiết Sách
          <i class="fas fa-address-card"></i>
        </h4>
        <SachCard :sach="activeSach" />
        <router-link :to="{
          name: 'sach.edit',
          params: { id: activeSach._id },
        }">
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import SachCard from "@/components/SachCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import SachList from "@/components/SachList.vue";
import sachService from "@/services/sach.service";
export default {
  components: {
    SachCard,
    InputSearch,
    SachList,
  },
  data() {
    return {
      sachs: [],
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
    // Chuyển các đối tượng sach thành chuỗi để tiện cho tìm kiếm.
    sachStrings() {
      return this.sachs.map((sach) => {
        const { tenSach, hinhAnh, tacGia, soQuyen, namXuatBan, maNhaXuatBan, donGia } = sach;
        return [tenSach, hinhAnh, tacGia, soQuyen, namXuatBan, maNhaXuatBan, donGia].join("");
      });
    },
    // Trả về các sach có chứa thông tin cần tìm kiếm.
    filteredSachs() {
      if (!this.searchText) return this.sachs;
      return this.sachs.filter((_sach, index) =>
        this.sachStrings[index].includes(this.searchText)
      );
    },
    activeSach() {
      if (this.activeIndex < 0) return null;
      console.log(this.filteredSachs[this.activeIndex]);
      return this.filteredSachs[this.activeIndex];
    },
    filteredSachsCount() {
      return this.filteredSachs.length;
    },
  },
  methods: {
    async retrieveSachs() {
      try {
        this.sachs = await sachService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveSachs();
      this.activeIndex = -1;
    },
    async removeAllSachs() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await SachService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddSach() {
      this.$router.push({ name: "sach.add" });
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
