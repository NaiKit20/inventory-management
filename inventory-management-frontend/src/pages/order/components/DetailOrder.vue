<template>
  <form @submit.prevent="onCreate">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-gray-600 mb-1">สินค้า *</label>
        <InputAutoComplete v-model="detailOrder.Goods_id" :items="products" />
        <p v-if="errors.Goods_id" class="text-red-600 text-xs mt-1">
          {{ errors.Goods_id }}
        </p>
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">วันที่กำหนดส่ง</label>
        <input
          type="date"
          v-model="detailOrder.Ord_date"
          class="h-10 text-black w-full px-2 py-2 border border-gray-500 rounded-md focus:outline-none"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1"
          >วันที่ส่งสินค้าจริง</label
        >
        <input
          type="date"
          v-model="detailOrder.Fin_date"
          class="h-10 text-black w-full px-2 py-2 border border-gray-500 rounded-md focus:outline-none"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">จำนวนสั่ง *</label>
        <input
          v-model.number="detailOrder.Amount"
          type="number"
          min="0"
          class="border rounded px-3 py-2 w-full"
          placeholder="0"
        />
        <p v-if="errors.Amount" class="text-red-600 text-xs mt-1">
          {{ errors.Amount }}
        </p>
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">ราคาต่อหน่วย *</label>
        <input
          v-model.number="detailOrder.COST_UNIT"
          type="number"
          min="0"
          class="border rounded px-3 py-2 w-full"
          placeholder="0"
          readonly
        />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">ราคารวม *</label>
        <input
          v-model.number="detailOrder.TOT_PRC"
          type="number"
          min="0"
          class="border rounded px-3 py-2 w-full"
          placeholder="0"
          readonly
        />
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
        :disabled="loading"
      >
        <span v-if="!loading">เพิ่มรายการ</span>
        <span v-else>กำลังบันทึก...</span>
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import InputAutoComplete from "@components/InputAutoComplete.vue";
import { formatDateTH } from "@/utils/formatDate";

export default {
  name: "DetailOrder",
  components: {
    InputAutoComplete,
  },
  data() {
    return {
      detailOrder: {
        Order_no: "",
        Goods_id: "",
        Ord_date: "",
        Fin_date: "",
        Amount: 0,
        COST_UNIT: 0,
        TOT_PRC: 0,
      },
      errors: {},
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.apiService.loading,
      detailOrders: (state) => state.apiService.detailOrders,
      products: (state) => {
        const list = state.apiService?.products ?? [];
        return list.map((prod) => ({
          label: prod.goods_name,
          value: prod.goods_id,
          cost_unit: prod.cost_unit,
        }));
      },
    }),
  },
  watch: {
    "detailOrder.Goods_id"(newVal) {
      const selectedProduct = this.products.find(
        (prod) => prod.value === newVal
      );
      if (selectedProduct) {
        this.detailOrder.COST_UNIT = selectedProduct.cost_unit;
        this.detailOrder.TOT_PRC =
          this.detailOrder.COST_UNIT * this.detailOrder.Amount;
      }
    },
    "detailOrder.Amount"(newVal) {
      this.detailOrder.TOT_PRC = this.detailOrder.COST_UNIT * newVal;
    },
  },
  methods: {
    formatDateTH,
    validateForm() {
      const errors = {};
      if (!this.detailOrder.Goods_id) errors.Goods_id = "กรุณาเลือกสินค้า";
      if (this.detailOrder.Amount <= 0) errors.Amount = "กรุณากรอกจำนวนสินค้า";

      if (!this.detailOrder.Ord_date)
        this.detailOrder.Ord_date = new Date().toISOString().substr(0, 10);

      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    onCreate() {
      this.detailOrder.Order_no = this.detailOrders?.order_no || "";

      if (!this.validateForm()) return;
      this.$store
        .dispatch("apiService/insertDetailOrder", { ...this.detailOrder })
        .then(() => {
          this.$store.dispatch(
            "apiService/getHeaderOrders",
            this.detailOrders?.order_no
          );

          this.detailOrder = {
            Order_no: "",
            Goods_id: "",
            Ord_date: "",
            Fin_date: "",
            Amount: 0,
            COST_UNIT: 0,
            TOT_PRC: 0,
          };
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
