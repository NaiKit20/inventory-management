import axios from "axios";

const state = {
  products: [],
  customers: [],
  headerOrders: [],
  masterOrders: [],
  detailOrders: null,
  reports: [],
  process: [],
  loading: false,
  error: null,
  host: "http://localhost:3000",
};

const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  SET_CUSTOMERS(state, payload) {
    state.customers = payload;
  },
  SET_DETAIL_ORDERS(state, payload) {
    state.detailOrders = payload;
  },
  SET_HEADER_ORDERS(state, payload) {
    state.headerOrders = payload;
  },
  SET_PROCESS(state, payload) {
    state.process = payload;
  },
  SET_REPORT(state, payload) {
    state.reports = payload;
  },
  SET_MASTER_ORDERS(state, payload) {
    state.masterOrders = payload;
  },
};

const actions = {
  async getAllProducts({ commit }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.get(`${state.host}/goods`);
      commit("SET_PRODUCTS", response.data);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async insertProducts({ commit }, products) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.post(`${state.host}/goods`, products);
      commit("SET_PRODUCTS", response.data);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async deleteProducts({ commit }, id) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.delete(`${state.host}/goods/${id}`);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการลบข้อมูลสินค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async updateProducts({ commit }, products) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.put(`${state.host}/goods`, products);
      commit("SET_PRODUCTS", response.data);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตข้อมูลสินค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async insertCustomers({ commit }, customers) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.post(`${state.host}/customer`, customers);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มข้อมูล"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async deleteCustomers({ commit }, id) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.delete(`${state.host}/customer/${id}`);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการลบข้อมูลลูกค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async updateCustomers({ commit }, customers) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.put(`${state.host}/customer`, customers);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตข้อมูลลูกค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async getAllCustomers({ commit }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.get(`${state.host}/customer`);
      commit("SET_CUSTOMERS", response.data);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async insertHeaderOrder({ commit }, headerOrder) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.post(
        `${state.host}/order/header`,
        headerOrder
      );
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async getHeaderOrders({ commit }, id) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.get(
        `${state.host}/order/header${id ? `/${id}` : ""}`
      );
      if (id) {
        commit("SET_DETAIL_ORDERS", response.data);
      } else {
        commit("SET_HEADER_ORDERS", response.data);
      }
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message ||
          "เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async insertDetailOrder({ commit }, detailOrder) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.post(`${state.host}/order/detail`, [
        detailOrder,
      ]);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async deleteHeaderOrder({ commit }, id) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.delete(
        `${state.host}/order/header?Order_no=${id}`
      );
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการลบข้อมูลคำสั่งซื้อ"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async deleteDetailOrder({ commit }, { Order_no, Goods_id }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.delete(
        `${state.host}/order/detail?Order_no=${Order_no}&Goods_id=${Goods_id}`
      );
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message ||
          "เกิดข้อผิดพลาดในการลบข้อมูลรายละเอียดคำสั่งซื้อ"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async updateDetailOrder({ commit }, detailOrder) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.put(
        `${state.host}/order/detail`,
        detailOrder
      );
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message ||
          "เกิดข้อผิดพลาดในการอัปเดตข้อมูลรายละเอียดคำสั่งซื้อ"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async getHeaderOrderByOrgDate({ commit }, { gdoc_date1, gdoc_date2 }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.get(
        `${state.host}/order/header/search/ord_date`,
        {
          params: { gdoc_date1, gdoc_date2 },
        }
      );
      commit("SET_REPORT", response.data);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูล"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async getHeaderOrderByFinDate({ commit }, { gdoc_date1, gdoc_date2 }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.get(
        `${state.host}/order/header/search/fin_date`,
        {
          params: { gdoc_date1, gdoc_date2 },
        }
      );
      commit("SET_REPORT", response.data);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูล"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async processtHeaderOrderByFinDate({ commit }, { gdoc_date1, gdoc_date2 }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.get(
        `${state.host}/order/header/search/fin_date/process`,
        {
          params: { gdoc_date1, gdoc_date2 },
        }
      );
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูล"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
  async getAllMasterOrders({ commit }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await axios.get(`${state.host}/order/master`);
      commit("SET_MASTER_ORDERS", response.data);
      commit("SET_LOADING", false);
      return response.data;
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า"
      );
      commit("SET_LOADING", false);
      throw error;
    }
  },
};

const getters = {
  getAllProducts: (state) => state.products,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
