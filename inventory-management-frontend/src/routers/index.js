import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@layouts/MainLayout.vue";
import HomePage from "@pages/homePage.vue";
import CustomerPage from "@pages/customer/CustomerPage.vue";
import ProductPage from "@pages/product/ProductPage.vue";
import OrderPage from "@pages/order/OrderPage.vue";
import ProcessPage from "@pages/process/ProcessPage.vue";
import ReportPage from "@pages/report/ReportPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: CustomerPage,
      },
      {
        path: "customers",
        name: "customers",
        component: CustomerPage,
      },
      {
        path: "products",
        name: "products",
        component: ProductPage,
      },
      {
        path: "orders",
        name: "orders",
        component: OrderPage,
      },
      {
        path: "process",
        name: "process",
        component: ProcessPage,
      },
      {
        path: "reports",
        name: "reports",
        component: ReportPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
