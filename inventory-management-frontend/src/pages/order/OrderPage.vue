<template>
  <PageCard title="การสั่งซื้อสินค้า">
    <template #actions>
      <button
        @click="openModal"
        class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        เพิ่มข้อมูลการสั่งซื้อสินค้า
      </button>
    </template>

    <div class="overflow-auto border rounded-lg">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-100 text-xs text-slate-600 uppercase">
          <tr>
            <th class="px-4 py-3 text-left">รหัสลูกค้า</th>
            <th class="px-4 py-3 text-left">ชื่อลูกค้า</th>
            <th class="px-4 py-3 text-left">ลำดับ</th>
            <th class="px-4 py-3 text-left">จำนวนรายการ</th>
            <th class="px-4 py-3 text-left">จำนวนที่สั่ง</th>
            <th class="px-4 py-3 text-center">การจัดการ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-sm">
          <tr
            v-for="(value, index) in headerOrders"
            :key="index"
            class="hover:bg-slate-50"
          >
            <td class="px-4 py-3 align-top font-medium text-slate-800">
              {{ value && value.cus_id }}
            </td>
            <td class="px-4 py-3 align-top">
              {{ value && value.cus_name }}
            </td>
            <td class="px-4 py-3 align-top">
              {{ value && value.order_no }}
            </td>
            <td class="px-4 py-3 align-top">
              {{ value && value.order_amount }}
            </td>
            <td class="px-4 py-3 align-top">
              {{
                value && value.item_amount ? value.item_amount.split(".")[0] : 0
              }}
            </td>
            <td class="px-4 py-3 align-top">
              <div class="flex gap-2 justify-center">
                <button
                  @click="
                    getHeaderOrderById(value.order_no);
                    openModal();
                  "
                  class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded"
                >
                  แก้ไข
                </button>
                <button
                  @click="onDeleteHeaderOrder(value)"
                  class="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded"
                >
                  ลบ
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="(headerOrders || []).length === 0">
            <td
              colspan="6"
              class="px-4 py-6 text-center text-slate-500 text-sm"
            >
              ยังไม่มีข้อมูลการสั่งซื้อ
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="showAddModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start md:items-center justify-center z-50 overflow-y-auto p-4"
        >
          <div
            class="relative bg-white w-full max-w-6xl rounded-xl shadow-xl flex flex-col max-h-[90vh]"
          >
            <!-- Sticky Header -->
            <div
              class="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b flex items-center justify-between rounded-t-xl"
            >
              <h2 class="text-lg font-semibold text-slate-800">
                เพิ่มรายการรับคำสั่งซื้อสินค้า
              </h2>
              <button
                @click="closeModal"
                class="text-slate-500 hover:text-slate-700 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <!-- Content -->
            <div class="px-6 py-6 overflow-y-auto space-y-6">
              <div v-if="detailOrders" class="space-y-6">
                <!-- Summary grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div class="p-3 rounded-lg bg-slate-50 border">
                    <span class="block text-xs text-slate-500">รหัสลูกค้า</span>
                    <span class="font-medium">{{
                      detailOrders?.cus_id?.cus_id || "-"
                    }}</span>
                  </div>
                  <div class="p-3 rounded-lg bg-slate-50 border">
                    <span class="block text-xs text-slate-500">ชื่อลูกค้า</span>
                    <span class="font-medium">{{
                      detailOrders?.cus_id?.cus_name || "-"
                    }}</span>
                  </div>
                  <div class="p-3 rounded-lg bg-slate-50 border">
                    <span class="block text-xs text-slate-500">เลขที่สั่ง</span>
                    <span class="font-medium">{{
                      detailOrders?.order_no || "-"
                    }}</span>
                  </div>
                  <div class="p-3 rounded-lg bg-slate-50 border">
                    <span class="block text-xs text-slate-500"
                      >วันที่สั่งสินค้า</span
                    >
                    <span class="font-medium">{{
                      formatDateTH(detailOrders?.order_date) || "-"
                    }}</span>
                  </div>
                </div>

                <!-- Detail form -->
                <DetailOrder />

                <!-- Table -->
                <div class="overflow-auto border rounded-lg">
                  <table class="min-w-full divide-y divide-slate-200">
                    <thead
                      class="bg-slate-100 text-xs text-slate-600 uppercase"
                    >
                      <tr>
                        <th class="px-4 py-3 text-left">รหัสสินค้า</th>
                        <th class="px-4 py-3 text-left">รายละเอียด</th>
                        <th class="px-4 py-3 text-right">วันที่กำหนดส่ง</th>
                        <th class="px-4 py-3 text-center">
                          วันที่ส่งสินค้าจริง
                        </th>
                        <th class="px-4 py-3 text-center">
                          จำนวนสินค้าที่สั่ง
                        </th>
                        <th class="px-4 py-3 text-center">ราคา/หน่วย</th>
                        <th class="px-4 py-3 text-center">ราคารวม</th>
                        <th class="px-4 py-3 text-center">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-sm">
                      <tr
                        v-for="(value, index) in detailOrders?.d_order || []"
                        :key="index"
                        class="hover:bg-slate-50"
                      >
                        <td
                          class="px-4 py-3 align-top font-medium text-slate-800"
                        >
                          {{ value && value.goods_id }}
                        </td>
                        <td class="px-4 py-3 align-top">
                          {{ value && value.goods.goods_name }}
                        </td>
                        <td class="px-4 py-3 align-top text-right">
                          <template
                            v-if="
                              detailOrderEdit &&
                              value.order_no == detailOrderEdit.order_no &&
                              value.goods_id == detailOrderEdit.goods_id
                            "
                          >
                            <input
                              type="date"
                              v-model="detailOrderEdit.ord_date"
                              class="w-full px-2 py-2 border rounded"
                            />
                          </template>
                          <template v-else>
                            {{ formatDateTH(value && value.ord_date) }}
                          </template>
                        </td>
                        <td class="px-4 py-3 align-top text-center">
                          <template
                            v-if="
                              detailOrderEdit &&
                              value.order_no == detailOrderEdit.order_no &&
                              value.goods_id == detailOrderEdit.goods_id
                            "
                          >
                            <input
                              type="date"
                              v-model="detailOrderEdit.fin_date"
                              class="w-full px-2 py-2 border rounded"
                            />
                          </template>
                          <template v-else>
                            {{ formatDateTH(value && value.fin_date) }}
                          </template>
                        </td>
                        <td class="px-4 py-3 align-top text-center">
                          <template
                            v-if="
                              detailOrderEdit &&
                              value.order_no == detailOrderEdit.order_no &&
                              value.goods_id == detailOrderEdit.goods_id
                            "
                          >
                            <input
                              v-model.number="detailOrderEdit.amount"
                              type="number"
                              min="0"
                              class="border rounded w-full min-w-20 px-2 py-2 text-right"
                              placeholder="0"
                              @change="
                                detailOrderEdit.tot_prc =
                                  detailOrderEdit.amount *
                                  detailOrderEdit.cost_unit
                              "
                            />
                          </template>
                          <template v-else>
                            {{ value && value.amount.split(".")[0] }}
                          </template>
                        </td>
                        <td class="px-4 py-3 align-top text-center">
                          {{ value && value.cost_unit }}
                        </td>
                        <td class="px-4 py-3 align-top text-center font-medium">
                          <template
                            v-if="
                              detailOrderEdit &&
                              value.order_no == detailOrderEdit.order_no &&
                              value.goods_id == detailOrderEdit.goods_id
                            "
                          >
                            {{ detailOrderEdit && detailOrderEdit.tot_prc }}
                          </template>
                          <template v-else>
                            {{ value && value.tot_prc }}
                          </template>
                        </td>
                        <td class="px-4 py-3 align-top">
                          <div class="flex gap-2 justify-center">
                            <template
                              v-if="
                                detailOrderEdit &&
                                value.order_no == detailOrderEdit.order_no &&
                                value.goods_id == detailOrderEdit.goods_id
                              "
                            >
                              <button
                                @click="onUpdateDetailOrder()"
                                class="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded"
                              >
                                บันทึก
                              </button>
                              <button
                                @click="detailOrderEdit = null"
                                class="bg-gray-300 hover:bg-gray-400 text-gray-900 text-sm px-3 py-2 rounded"
                              >
                                ยกเลิก
                              </button></template
                            >
                            <template v-else>
                              <button
                                @click="onStartUpateDetailOrder(value)"
                                class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded"
                              >
                                แก้ไข
                              </button>
                              <button
                                @click="onDeleteDetailOrder(value)"
                                class="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded"
                              >
                                ลบ
                              </button></template
                            >
                          </div>
                        </td>
                      </tr>
                      <tr v-if="(detailOrders?.d_order || []).length === 0">
                        <td
                          colspan="8"
                          class="px-4 py-6 text-center text-slate-500 text-sm"
                        >
                          ยังไม่มีรายการสินค้า
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- Actions -->
                <div class="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-4 py-2 text-sm font-medium rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700"
                  >
                    กลับหน้าหลัก
                  </button>
                </div>
              </div>
              <HeaderOrder v-else @cancel="closeModal" />
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </PageCard>
</template>

<script>
import { mapState } from "vuex";
import HeaderOrder from "./components/HeaderOrder.vue";
import DetailOrder from "./components/DetailOrder.vue";
import { Teleport } from "vue";
import PageCard from "@components/PageCard.vue";
import { formatDateTH } from "@/utils/formatDate";

export default {
  name: "orderPage",
  components: {
    HeaderOrder,
    DetailOrder,
    PageCard,
  },
  data() {
    return {
      showAddModal: false,
      detailOrderEdit: null,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState({
      loading: (state) => state.apiService.loading,
      products: (state) => state.apiService.products,
      customers: (state) => state.apiService.customers,
      headerOrders: (state) => state.apiService.headerOrders,
      detailOrders: (state) => state.apiService.detailOrders,
    }),
  },
  methods: {
    formatDateTH,
    getData() {
      this.$store.dispatch("apiService/getAllProducts");
      this.$store.dispatch("apiService/getAllCustomers");
      this.$store.dispatch("apiService/getHeaderOrders");
    },
    openModal() {
      this.showAddModal = true;
    },
    closeModal() {
      this.getData();
      this.$store.commit("apiService/SET_DETAIL_ORDERS", null);
      this.showAddModal = false;
    },
    onDeleteHeaderOrder(item) {
      if (confirm(`ยืนยันการลบคำสั่งซื้อ ${item.order_no}?`)) {
        this.$store
          .dispatch("apiService/deleteHeaderOrder", item.order_no)
          .then(() => {
            this.getData();
          })
          .catch((error) => {
            alert("เกิดข้อผิดพลาดในการลบคำสั่งซื้อ: " + error.message);
          });
      }
    },
    onDeleteDetailOrder(item) {
      if (confirm(`ยืนยันการลบสินค้าสั่งซื้อ ${item.goods.goods_name}?`)) {
        this.$store
          .dispatch("apiService/deleteDetailOrder", {
            Order_no: item.order_no,
            Goods_id: item.goods_id,
          })
          .then(() => {
            this.$store.dispatch(
              "apiService/getHeaderOrders",
              this.detailOrders?.order_no
            );
          })
          .catch((error) => {
            alert("เกิดข้อผิดพลาดในการลบสินค้าสั่งซื้อ: " + error.message);
          });
      }
    },
    getHeaderOrderById(id) {
      this.$store.dispatch("apiService/getHeaderOrders", id);
    },
    onStartUpateDetailOrder(item) {
      this.detailOrderEdit = item;
      this.detailOrderEdit = {
        ...item,
        ...{
          ord_date: item.ord_date.split("T")[0],
          fin_date: item.fin_date.split("T")[0],
        },
      };
    },
    onUpdateDetailOrder() {
      if (
        confirm(
          `ยืนยันการแก้ไขสินค้าสั่งซื้อ ${this.detailOrderEdit.order_no}?`
        )
      ) {
        this.$store
          .dispatch("apiService/updateDetailOrder", this.detailOrderEdit)
          .then(() => {
            this.detailOrderEdit = null;
            this.$store.dispatch(
              "apiService/getHeaderOrders",
              this.detailOrders?.order_no
            );
          })
          .catch((error) => {
            alert("เกิดข้อผิดพลาดในการลบคำสั่งซื้อ: " + error.message);
          });
      }
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
