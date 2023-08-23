const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { superadmin: true },
    children: [
      {
        path: "dashboard",
        name: "superadmin",
        component: () => import("src/pages/administrator/IndexPage.vue"),
      },
      {
        path: "capil",
        name: "penduduk",
        component: () => import("src/pages/administrator/Penduduk.vue"),
      },
      {
        path: "data-akte",
        name: "capil",
        component: () => import("src/pages/administrator/Capil.vue"),
      },
      {
        path: "kesehatan",
        name: "kesehatan",
        component: () => import("src/pages/administrator/Kesehatan.vue"),
      },
      {
        path: "sosial",
        name: "sosial",
        component: () => import("src/pages/administrator/Sosial.vue"),
      },
      {
        path: "kecamatan",
        name: "kecamatan",
        component: () => import("src/pages/administrator/Kecamatan.vue"),
      },
      {
        path: "desa",
        name: "desa",
        component: () => import("src/pages/administrator/Desa.vue"),
      },
      {
        path: "dusun",
        name: "dusun",
        component: () => import("src/pages/administrator/Dusun.vue"),
      },
      {
        path: "RT",
        name: "RT",
        component: () => import("src/pages/administrator/RT.vue"),
      },
      {
        path: "add",
        name: "tambah_penduduk",
        component: () => import("src/pages/administrator/TambahPenduduk.vue"),
      },
      {
        path: "ptm",
        name: "ptm",
        component: () => import("src/pages/administrator/PTM.vue"),
      },
      {
        path: "export",
        name: "export",
        component: () => import("pages/ExportPage.vue"),
      },
      {
        path: "import",
        name: "import",
        component: () => import("pages/ImportPage.vue"),
      },
      {
        path: "tambah-pengguna",
        name: "tambahPengguna",
        component: () => import("pages/PenggunaPage.vue"),
      },
      {
        path: "bantuan",
        name: "bantuan",
        component: () => import("pages/BantuanPage.vue"),
      },
      {
        path: "penyakit",
        name: "penyakit",
        component: () => import("pages/PenyakitPage.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("pages/ProfilPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/AccessLayout.vue"),
    children: [
      {
        path: "",
        name: "auth",
        component: () => import("src/pages/access/IndexPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/AccessLayout.vue"),
    meta: { guest: true },
    children: [
      {
        path: "/guest/add",
        name: "formDataPenduduk",
        component: () => import("src/pages/guest/TambahPenduduk.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: "/auth",
  //   name: "auth",
  //   component: () => import("pages/access/LoginPage.vue"),
  // },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
