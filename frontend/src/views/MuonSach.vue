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
      <MuonSachList v-if="filteredMuonSachsCount > 0" :muonSachs="filteredMuonSachs" v-model:activeIndex="activeIndex" />
      <p v-else>Không có lượt mượn sách nào.</p>
    </div>
    <div class="mt-3 col-md-6">
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
      muonSachs: [],
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
    muonSachStrings() {
      return this.muonSachs.map((muonSach) => {
        const { maSach, maDocGia, maNhanVien, ngayMuon, ngayTra, pheDuyet } = muonSach;
        return [maSach, maDocGia, maNhanVien, ngayMuon, ngayTra, pheDuyet].join("");
      });
    },
    filteredMuonSachs() {
      if (!this.searchText) return this.muonSachs;
      return this.muonSachs.filter((_muonSach, index) =>
        this.muonSachStrings[index].includes(this.searchText)
      );
    },
    activeMuonSach() {
      if (this.activeIndex < 0) return null;
      return this.filteredMuonSachs[this.activeIndex];
    },
    filteredMuonSachsCount() {
      return this.filteredMuonSachs.length;
    },
  },
  methods: {
    async retrieveMuonSachs() {
      try {
        const maDocGia = localStorage.getItem('id_docGia');
        this.muonSachs = await muonSachService.getMuonSach(maDocGia);
      } catch (error) {
        console.log(error);
      }
    },
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
