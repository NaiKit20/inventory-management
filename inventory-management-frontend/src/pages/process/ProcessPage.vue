<template>
  <div class="flex flex-col gap-4">
    <PageCard title="ประมวลผล">
      <template #actions>
        <div>
          <label class="block text-sm text-gray-600 mb-1"
            >ระหว่างวันที่ส่งสินค้า</label
          >
          <input
            type="date"
            v-model="gdoc_date1"
            class="text-black w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">ถึงวันที่</label>
          <input
            type="date"
            v-model="gdoc_date2"
            class="text-black w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
          />
        </div>
        <button
          class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          @click="getHeaderOrderByFinDate()"
        >
          แสดง
        </button>
        <button
          v-if="reports.length > 0"
          @click="process()"
          class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          ประมวลผล
        </button>
      </template>

      <div class="overflow-auto border rounded-lg">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-100 text-xs text-slate-600 uppercase">
            <tr>
              <th class="px-4 py-3 text-left">ลำดับ</th>
              <th class="px-4 py-3 text-left">รายละเอียดลูกค้า</th>
              <th class="px-4 py-3 text-left">รายละเอียดสินค้า</th>
              <th class="px-4 py-3 text-left">วันที่สั่ง</th>
              <th class="px-4 py-3 text-left">เลขที่สั่ง</th>
              <th class="px-4 py-3 text-left">วันที่ส่งจริง</th>
              <th class="px-4 py-3 text-left">จำนวน</th>
              <th class="px-4 py-3 text-left">ราคา/หน่วย</th>
              <th class="px-4 py-3 text-left">ราคารวม</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr
              v-for="(value, index) in reports"
              :key="index"
              class="hover:bg-slate-50"
            >
              <td class="px-4 py-3 align-top font-medium text-slate-800">
                {{ index + 1 }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value.cus_id }} : {{ value.cus_name }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value.goods_id }} : {{ value.goods_name }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && formatDateTH(value.doc_date) }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && value.order_no }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && formatDateTH(value.fin_date) }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && value.amount ? value.amount.split(".")[0] : 0 }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && value.cost_unit }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && value.tot_prc }}
              </td>
            </tr>
            <tr v-if="(reports || []).length === 0">
              <td
                colspan="9"
                class="px-4 py-6 text-center text-slate-500 text-sm"
              >
                ไม่มีข้อมูลประมวลผล
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageCard>
    <PageCard title="การสั่งสินค้าของลูกค้า">
      <div class="overflow-auto border rounded-lg">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-100 text-xs text-slate-600 uppercase">
            <tr>
              <th class="px-4 py-3 text-left">รายละเอียดลูกค้า</th>
              <th class="px-4 py-3 text-left">รายละเอียดสินค้า</th>
              <th class="px-4 py-3 text-left">วันที่สร้าง</th>
              <th class="px-4 py-3 text-left">วันที่สั่งสินค้า</th>
              <th class="px-4 py-3 text-left">วันที่ส่งตามแผน</th>
              <th class="px-4 py-3 text-left">วันที่ส่งจริง</th>
              <th class="px-4 py-3 text-left">จำนวน</th>
              <th class="px-4 py-3 text-left">ราคารวม</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr
              v-for="(value, index) in masterOrders"
              :key="index"
              class="hover:bg-slate-50"
            >
              <td class="px-4 py-3 align-top">
                {{ value.cus_id }} : {{ value.customer.cus_name }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value.goods_id }} : {{ value.goods.goods_name }}
              </td>
              <td class="px-4 py-3 align-top font-medium text-slate-800">
                {{ value && formatDateTH(value.sys_date) }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && formatDateTH(value.doc_date) }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && formatDateTH(value.ord_date) }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && formatDateTH(value.fin_date) }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && value.amount ? value.amount.split(".")[0] : 0 }}
              </td>
              <td class="px-4 py-3 align-top">
                {{ value && value.cost_tot }}
              </td>
            </tr>
            <tr v-if="(masterOrders || []).length === 0">
              <td
                colspan="8"
                class="px-4 py-6 text-center text-slate-500 text-sm"
              >
                ไม่มีข้อมูลการสั่งสินค้าของลูกค้า
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageCard>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageCard from "@components/PageCard.vue";
import { formatDateTH } from "@/utils/formatDate";

export default {
  name: "processPage",
  components: { PageCard },
  data() {
    return {
      showAddModal: false,
      gdoc_date1: "",
      gdoc_date2: "",
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState({
      reports: (state) => state.apiService.reports,
      masterOrders: (state) => state.apiService.masterOrders,
    }),
  },
  methods: {
    formatDateTH,
    getData() {
      this.$store.dispatch("apiService/getAllMasterOrders");
    },
    getHeaderOrderByFinDate() {
      if (!this.gdoc_date1 || !this.gdoc_date2) return;
      this.$store.dispatch("apiService/getHeaderOrderByFinDate", {
        gdoc_date1: this.gdoc_date1,
        gdoc_date2: this.gdoc_date2,
      });
    },
    process() {
      this.$store
        .dispatch("apiService/processtHeaderOrderByFinDate", {
          gdoc_date1: this.gdoc_date1,
          gdoc_date2: this.gdoc_date2,
        })
        .then(() => {
          this.getData();
        });
    },
  },
  beforeUnmount() {
    this.$store.commit("apiService/SET_REPORT", []);
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
