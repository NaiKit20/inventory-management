<template>
  <section class="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
    <header v-if="title || $slots.actions" class="flex flex-wrap gap-4 justify-between items-center mb-6">
      <h1 v-if="title" class="text-2xl font-semibold tracking-tight text-slate-800">{{ title }}</h1>
      <div class="ml-auto flex gap-4 items-end"><slot name="actions" /></div>
    </header>
    <div>
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: "PageCard",
  props: {
    title: { type: String, default: "" },
  },
};
</script>

<style scoped></style>
