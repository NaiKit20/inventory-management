<template>
  <PageCard title="รายงาน">
    <template #actions>
      <div class="no-print">
        <label class="block text-sm text-gray-600 mb-1"
          >วันที่กำหนดส่งตามแผน</label
        >
        <input
          type="date"
          v-model="gdoc_date1"
          class="text-black w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
        />
      </div>
      <div class="no-print">
        <label class="block text-sm text-gray-600 mb-1">ถึงวันที่</label>
        <input
          type="date"
          v-model="gdoc_date2"
          class="text-black w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
        />
      </div>
      <button
        class="no-print inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        @click="getData()"
      >
        แสดง
      </button>
      <button
        v-if="reports.length > 0"
        @click="print()"
        class="no-print inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        พิมพ์
      </button>
    </template>

    <div class="overflow-auto border rounded-lg print-area">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-100 text-xs text-slate-600 uppercase">
          <tr>
            <th class="px-4 py-3 text-left">ลำดับ</th>
            <th class="px-4 py-3 text-left">รายละเอียดลูกค้า</th>
            <th class="px-4 py-3 text-left">รายละเอียดสินค้า</th>
            <th class="px-4 py-3 text-left">วันที่สั่ง</th>
            <th class="px-4 py-3 text-left">เลขที่สั่ง</th>
            <th class="px-4 py-3 text-left">วันที่กำหนดส่ง</th>
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
              {{ value && formatDateTH(value.ord_date) }}
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
              ไม่มีข้อมูลรายงาน
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageCard>
</template>

<script>
import { mapState } from "vuex";
import PageCard from "@components/PageCard.vue";
import { formatDateTH } from "@/utils/formatDate";

export default {
  name: "reportPage",
  components: { PageCard },
  data() {
    return {
      showAddModal: false,
      gdoc_date1: "",
      gdoc_date2: "",
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      reports: (state) => state.apiService.reports,
    }),
  },
  methods: {
    formatDateTH,
    getData() {
      if (!this.gdoc_date1 || !this.gdoc_date2) return;
      this.$store.dispatch("apiService/getHeaderOrderByOrgDate", {
        gdoc_date1: this.gdoc_date1,
        gdoc_date2: this.gdoc_date2,
      });
    },
    print() {
      window.print();
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

<style>
@media print {
  body * {
    visibility: hidden !important;
  }
  .print-area,
  .print-area * {
    visibility: visible !important;
  }
  .print-area {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
  }
  .no-print {
    display: none !important;
  }
}
</style>
