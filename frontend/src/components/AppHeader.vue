<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý mượn sách</a>
    <div class="mr-4 navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'Libary' }" class="nav-link">
          Thư Viện
          <i class="fa-solid fa-book"></i>
        </router-link>
      </li>
    </div>
    <div class="mr-4 navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'MuonSach' }" class="nav-link">
          Mượn Sách
          <i class="fa-solid fa-book-open-reader"></i>
        </router-link>
      </li>
    </div>
    <div class="mr-4 navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'DocGia' }" class="nav-link">
          Cá Nhân
          <i class="fa-solid fa-user"></i>
        </router-link>
      </li>
    </div>
    <div class="ml-auto navbar-nav" v-if="isLoggedIn">
      <li class="nav-item">
        <router-link @click="logout" to="/login" class="nav-link">
          Đăng xuất
          <i class="fas fa-sign-out-alt"></i>
        </router-link>
      </li>
    </div>
    <div class="ml-auto navbar-nav" v-if="!isLoggedIn">
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          Đăng nhập
          <i class="fa-solid fa-right-to-bracket"></i>
        </router-link>
      </li>
    </div>
    <div class="ml-4 navbar-nav" v-if="!isLoggedIn">
      <li class="nav-item">
        <router-link  to="/register" class="nav-link">
          Đăng ký
          <i class="fa-solid fa-circle-plus"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      // Kiểm tra xem id_docGia có tồn tại trong localStorage không
      return !!localStorage.getItem("id_docGia");
    }
  },
  methods: {
    logout() {
      // Xử lý đăng xuất ở đây
      // Ví dụ: Xóa id nhân viên từ localStorage
      localStorage.removeItem("id_docGia");
    }
  }
}
</script>

<style>
/* Bổ sung CSS nếu cần thiết */
</style>
