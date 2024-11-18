import { createWebHistory, createRouter } from "vue-router";
import AdminLogin from "@/views/admin/login/AdminLogin.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import NotFound from "@/views/NotFound.vue";
import UserHome from "@/views/UserHome.vue";
const routes = [
    {
        path: "/admin/login",
        name: "adminlogin",
        component: AdminLogin,
        meta: { requiresAuth: false },
    },
    {
        path: "/admin",
        name: "admindashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
        // redirect: { name: "book" }, 
        children: [
            {
                path: "",
                name: "welcomeadmin",
                component: () => import("@/components/WelcomAdmin.vue")
            },
            {
                path: "publisher",
                name: "publisher",
                component: () => import("@/views/admin/publisher/Publisher.vue"),
                meta: { requiresAuth: true }
            },
            {
                path: "publisher/add",
                name: "publisher.add",
                component: () => import("@/views/admin/publisher/PublisherAdd.vue"),
                meta: { requiresAuth: true }
            },
            {
                path: "publisher/:id",
                name: "publisher.edit",
                component: () => import("@/views/admin/publisher/PublisherEdit.vue"),
                meta: { requiresAuth: true },
                props: true
            },
            {
                path: "book",
                name: "book",
                component: () => import("@/views/admin/book/Book.vue"),
                meta: { requiresAuth: true }
            },
            {
                path: "book/add",
                name: "book.add",
                component: () => import("@/views/admin/book/BookAdd.vue"),
                meta: { requiresAuth: true }
            },
            {
                path: "book/:id",
                name: "book.edit",
                component: () => import("@/views/admin/book/BookEdit.vue"),
                meta: { requiresAuth: true },
                props: true
            },
            {
                path: "reader",
                name: "reader",
                component: () => import("@/views/admin/reader/Reader.vue"),
                meta: { requiresAuth: true }
            },
            {
                path: "reader/add",
                name: "reader.add",
                component: () => import("@/views/admin/reader/ReaderAdd.vue"),
                meta: { requiresAuth: true }
            },
            {
                path: "reader/:id",
                name: "reader.edit",
                component: () => import("@/views/admin/reader/ReaderEdit.vue"),
                meta: { requiresAuth: true },
                props: true
            },
            {
                path: "trackbookrent",
                name: "trackbookrent",
                component: () => import("@/views/admin/trackbookrent/TrackBookRent.vue"),
                meta: { requiresAuth: true }
            },
            {
                path: "trackbookrent/add",
                name: "trackbookrent.add",
                component: () => import("@/views/admin/trackbookrent/TrackBookRentAdd.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "trackbookrent/:id",
                name: "trackbookrent.edit",
                component: () => import("@/views/admin/trackbookrent/TrackBookRentEdit.vue"),
                meta: { requiresAuth: true },
                props: true
            },
        ]
    },
    {
        path: "/",
        name: UserHome,
        component: () => import("@/views/UserHome.vue"),
        children: [
            {
                path: "",
                name: "userbody",
                component: () => import("@/components/UserHomeBody.vue")
            },
            {
                path: "/:bookId", // Thay đổi đường dẫn để rõ ràng hơn
                name: "detailbook",
                component: () => import("@/views/DetailBook.vue"),
                props: true
            },
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Middleware để kiểm tra quyền truy cập
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'adminlogin' });
  } else {
    next();
  }
});

export default router;