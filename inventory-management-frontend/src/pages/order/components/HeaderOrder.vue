<template>
  <form @submit.prevent="onCreate">
    <div class="space-y-4">
      <div>
        <label class="block text-sm text-gray-600 mb-1">ชื่อลูกค้า *</label>
        <InputAutoComplete v-model="data.cus_id" :items="customers" />
        <p v-if="errors.cus_id" class="text-red-600 text-xs mt-1">
          {{ errors.cus_id }}
        </p>
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">วันที่สั่งสินค้า</label>
        <input
          type="date"
          v-model="data.order_date"
          class="h-10 text-black w-full px-2 py-2 border border-gray-500 rounded-md focus:outline-none"
        />
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <button
        type="button"
        @click="$emit('cancel')"
        class="bg-gray-300 hover:bg-gray-400 text-gray-900 text-sm px-4 py-2 rounded"
      >
        ยกเลิก
      </button>
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
        :disabled="loading"
      >
        <span v-if="!loading">บันทึกและเพิ่มสินค้าต่อ</span>
        <span v-else>กำลังบันทึก...</span>
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import InputAutoComplete from "@components/InputAutoComplete.vue";

export default {
  name: "HeaderOrder",
  components: {
    InputAutoComplete,
  },
  emits: ["cancel"],
  data() {
    return {
      data: {
        order_date: "",
        cus_id: "",
      },
      errors: {},
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.apiService.loading,
      customers: (state) => {
        return (state.apiService.customers || []).map((cus) => ({
          label: cus.cus_name,
          value: cus.cus_id,
        }));
      },
    }),
  },
  methods: {
    validateForm() {
      const errors = {};
      if (!this.data.cus_id) errors.cus_id = "กรุณาเลือกชื่อลูกค้า";

      if (!this.data.order_date)
        this.data.order_date = new Date().toISOString().substr(0, 10);

      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    onCreate() {
      if (!this.validateForm()) return;
      this.$store
        .dispatch("apiService/insertHeaderOrder", { ...this.data })
        .then((res) => {
          this.$store.dispatch("apiService/getHeaderOrders", res.order_no);
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
