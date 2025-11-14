<template>
  <div class="bg-slate-50 min-h-screen">
    <Header />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <router-view />
    </main>
  </div>
  
</template>

<script>
import Header from "@components/Header.vue";

export default {
  name: "MainLayout",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped></style>
