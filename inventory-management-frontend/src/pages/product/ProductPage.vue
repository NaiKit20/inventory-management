<template>
  <PageCard title="ข้อมูลสินค้า">
    <template #actions>
      <button
        @click="showAddModal = true"
        class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        เพิ่มสินค้า
      </button>
    </template>

    <div class="overflow-auto border rounded-lg">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-100 text-xs text-slate-600 uppercase">
          <tr>
            <th class="px-4 py-3 text-left">รหัสสินค้า</th>
            <th class="px-4 py-3 text-left">ชื่อสินค้า</th>
            <th class="px-4 py-3 text-right">ราคาต่อหน่วย (บาท)</th>
            <th class="px-4 py-3 text-center">การจัดการ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-sm">
          <tr
            v-for="(value, index) in products"
            :key="index"
            class="hover:bg-slate-50"
          >
            <td class="px-4 py-3 align-top font-medium text-slate-800">
              {{ value && value.goods_id }}
            </td>
            <td class="px-4 py-3 align-top">
              <template v-if="value && editingId === value.goods_id">
                <input
                  v-model="editData.goods_name"
                  type="text"
                  class="border rounded px-3 py-2 w-full"
                  placeholder="เช่น สินค้า A"
                />
              </template>
              <template v-else>
                {{ value && value.goods_name }}
              </template>
            </td>
            <td class="px-4 py-3 align-top text-right">
              <template v-if="value && editingId === value.goods_id">
                <input
                  v-model="editData.cost_unit"
                  type="number"
                  min="0"
                  step="0.01"
                  class="border rounded px-3 py-2 w-40 text-right"
                  placeholder="0"
                />
              </template>
              <template v-else>
                {{ formatPrice(value && value.cost_unit) }}
              </template>
            </td>
            <td class="px-4 py-3 align-top">
              <div class="flex gap-2 justify-center">
                <template v-if="value && editingId === value.goods_id">
                  <button
                    @click="saveEdit(value)"
                    class="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded"
                  >
                    บันทึก
                  </button>
                  <button
                    @click="cancelEdit"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-900 text-sm px-3 py-2 rounded"
                  >
                    ยกเลิก
                  </button>
                </template>
                <template v-else>
                  <button
                    @click="onEdit(value)"
                    class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded"
                  >
                    แก้ไข
                  </button>
                  <button
                    @click="onDelete(value)"
                    class="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded"
                  >
                    ลบ
                  </button>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="(products || []).length === 0">
            <td
              colspan="4"
              class="px-4 py-6 text-center text-slate-500 text-sm"
            >
              ยังไม่มีสินค้า
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageCard>

  <!-- Modal -->
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="showAddModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start md:items-center justify-center z-50 overflow-y-auto p-4"
      >
        <div
          class="relative bg-white w-full max-w-lg rounded-xl shadow-xl flex flex-col max-h-[90vh]"
        >
          <div
            class="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b flex items-center justify-between rounded-t-xl"
          >
            <h2 class="text-lg font-semibold text-slate-800">
              เพิ่มสินค้าใหม่
            </h2>
            <button
              @click="showAddModal = false"
              class="text-slate-500 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div class="px-6 py-6 overflow-y-auto">
            <form @submit.prevent="onCreate">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1"
                    >รหัสสินค้า *</label
                  >
                  <div class="relative">
                    <input
                      v-model.trim="addData.goods_id"
                      type="text"
                      class="border rounded px-3 py-2 w-full"
                      placeholder="เช่น P004"
                      :class="{ 'border-red-500': addErrors.goods_id }"
                    />
                    <button
                      type="button"
                      @click="generateGoodsId"
                      class="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                    >
                      สุ่มรหัส
                    </button>
                  </div>
                  <p
                    v-if="addErrors.goods_id"
                    class="text-red-600 text-xs mt-1"
                  >
                    {{ addErrors.goods_id }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1"
                    >ชื่อสินค้า *</label
                  >
                  <input
                    v-model.trim="addData.goods_name"
                    type="text"
                    class="border rounded px-3 py-2 w-full"
                    placeholder="เช่น สินค้า D"
                    :class="{ 'border-red-500': addErrors.goods_name }"
                  />
                  <p
                    v-if="addErrors.goods_name"
                    class="text-red-600 text-xs mt-1"
                  >
                    {{ addErrors.goods_name }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1"
                    >ราคาต่อหน่วย (บาท) *</label
                  >
                  <input
                    v-model="addData.cost_unit"
                    type="number"
                    min="0"
                    step="0.01"
                    class="border rounded px-3 py-2 w-full"
                    placeholder="0"
                    :class="{ 'border-red-500': addErrors.cost_unit }"
                  />
                  <p
                    v-if="addErrors.cost_unit"
                    class="text-red-600 text-xs mt-1"
                  >
                    {{ addErrors.cost_unit }}
                  </p>
                </div>
              </div>

              <div class="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  @click="showAddModal = false"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-900 text-sm px-4 py-2 rounded"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  class="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
                  :disabled="loading"
                >
                  <span v-if="!loading">บันทึก</span>
                  <span v-else>กำลังบันทึก...</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import { mapState } from "vuex";
import PageCard from "@components/PageCard.vue";
import { Teleport } from "vue";

export default {
  name: "productPage",
  components: { PageCard },
  data() {
    return {
      showAddModal: false,
      editingId: null,
      editData: {
        goods_id: "",
        goods_name: "",
        cost_unit: 0,
      },
      addData: {
        goods_id: "",
        goods_name: "",
        cost_unit: 0,
      },
      addErrors: {},
    };
  },
  mounted() {
    this.$store.dispatch("apiService/getAllProducts");
  },
  watch: {
    showAddModal(newVal) {
      if (!newVal) {
        this.addData = { goods_id: "", goods_name: "", cost_unit: 0 };
        this.addErrors = {};
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.apiService.loading,
      products: (state) => state.apiService && state.apiService.products,
    }),
  },
  methods: {
    formatPrice(amount) {
      const n = Number(amount);
      return Number.isFinite(n) ? n.toLocaleString() : "-";
    },
    validateForm(item) {
      const errors = {};
      if (!item.goods_id || item.goods_id.length !== 10)
        errors.goods_id = "กรุณากรอกรหัสสินค้าให้ครบ 10 ตำแหน่ง";

      if (!item.goods_name) errors.goods_name = "กรุณากรอกชื่อสินค้า";

      if (
        item.cost_unit === null ||
        item.cost_unit === "" ||
        isNaN(item.cost_unit)
      ) {
        errors.cost_unit = "กรุณากรอกราคาเป็นตัวเลข";
      } else if (item.cost_unit < 0) {
        errors.cost_unit = "ราคาต้องไม่เป็นค่าติดลบ";
      }

      this.addErrors = errors;
      return Object.keys(errors).length === 0;
    },
    onCreate() {
      if (!this.validateForm(this.addData)) return;
      this.$store
        .dispatch("apiService/insertProducts", { ...this.addData })
        .then(() => {
          this.$store.dispatch("apiService/getAllProducts").finally(() => {
            this.showAddModal = false;
          });
        })
        .catch((error) => {
          alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า: " + error.message);
        });
    },
    onEdit(item) {
      this.editingId = item.goods_id;
      this.editData = {
        goods_id: item.goods_id,
        goods_name: item.goods_name,
        cost_unit: item.cost_unit,
      };
    },
    cancelEdit() {
      this.editingId = null;
      this.editData = { goods_id: "", goods_name: "", cost_unit: 0 };
    },
    saveEdit() {
      if (!this.validateForm(this.editData)) return;
      this.$store
        .dispatch("apiService/updateProducts", { ...this.editData })
        .then(() => {
          this.$store.dispatch("apiService/getAllProducts").finally(() => {
            this.cancelEdit();
          });
        })
        .catch((error) => {
          alert("เกิดข้อผิดพลาดในการแก้ไขสินค้า: " + error.message);
        });
    },
    onDelete(item) {
      if (confirm(`ยืนยันการลบสินค้า ${item.goods_name}?`)) {
        this.$store
          .dispatch("apiService/deleteProducts", item.goods_id)
          .then(() => {
            this.$store.dispatch("apiService/getAllProducts");
          })
          .catch((error) => {
            alert("เกิดข้อผิดพลาดในการลบสินค้า: " + error.message);
          });
      }
    },
    generateGoodsId() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.addData.goods_id = result;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
