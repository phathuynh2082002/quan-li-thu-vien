import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
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
    path: "/DocGia",
    name: "DocGia",
    component: () => import("@/views/DocGia.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/sachs/:id",
    name: "sach.muon",
    component: () => import("@/views/SachMuon.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("id_docGia");
  if ((to.name === "MuonSach" || to.name === "NhanVien" || to.name === "sach.muon") && !isAuthenticated) {
    next({ name: "login" }); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  } else {
    next(); // Nếu đã đăng nhập và là nhân viên hoặc không truy cập các trang yêu cầu quyền, cho phép truy cập vào trang đó
  }
});

export default router;
