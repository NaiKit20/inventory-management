<template>
  <header
    class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
    >
      <h1 class="text-lg font-semibold text-slate-800">Inventory Management</h1>
      <nav>
        <ul class="flex gap-6">
          <li v-for="item in menu" :key="item.name">
            <router-link
              :to="item.link"
              class="text-sm font-medium text-slate-600 hover:text-slate-900 relative"
              :class="{
                'text-slate-900 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-indigo-600 after:rounded':
                  isActive(item.link),
              }"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menu: [
        {
          name: "ลูกค้า",
          link: "/customers",
        },
        {
          name: "สินค้า",
          link: "/products",
        },
        {
          name: "คำสั่งซื้อ",
          link: "/orders",
        },
        {
          name: "รายงาน",
          link: "/reports",
        },
        {
          name: "ประมวลผล",
          link: "/process",
        },
      ],
    };
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
  },
};
</script>

<style lang="scss" scoped></style>
