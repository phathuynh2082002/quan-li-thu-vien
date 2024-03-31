import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "Libary",
    component: () => import("@/views/Libary.vue"),
  },
  {
    path: "/MuonSach",
    name: "MuonSach",
    component: () => import("@/views/MuonSach.vue"),
  },
  {
    path: "/NhanVien",
    name: "NhanVien",
    component: () => import("@/views/NhanVien.vue"),
  },
  {
    path: "/NhaXuatBan",
    name: "NhaXuatBan",
    component: () => import("@/views/NhaXuatBan.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/sachs/:id",
    name: "sach.edit",
    component: () => import("@/views/SachEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/sachs/",
    name: "sach.add",
    component: () => import("@/views/SachAdd.vue"),
  },
  {
    path: "/nhaXuatBans/:id",
    name: "nhaXuatBan.edit",
    component: () => import("@/views/NhaXuatBanEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/nhaXuatBans/",
    name: "nhaXuatBan.add",
    component: () => import("@/views/NhaXuatBanAdd.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('id_nhanVien');

  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' }); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  } else {
    next(); // Nếu đã đăng nhập, cho phép truy cập vào trang đó
  }
});

export default router;
