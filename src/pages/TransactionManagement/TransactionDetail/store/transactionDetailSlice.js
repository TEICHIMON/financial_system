import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchTransactions } from '../api';

export const fetchTransactions = createAsyncThunk(
  'transactionDetail/fetch',
  async (params) => {
    const response = await searchTransactions(params);
    return {
      list: response.data.list,
      total: response.data.total,
      page: params.page || 1,
      pageSize: params.pageSize || 20,
    };
  }
);

const transactionDetailSlice = createSlice({
  name: 'transactionDetail',
  initialState: {
    list: [],
    loading: false,
    error: null,
    filters: {},
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0,
    },
    selectedRows: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.pagination.current = action.payload.page;
      state.pagination.pageSize = action.payload.pageSize;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearData: (state) => {
      state.list = [];
      state.pagination.total = 0;
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.list = action.payload.list;
        state.pagination.total = action.payload.total;
        state.pagination.current = action.payload.page;
        state.pagination.pageSize = action.payload.pageSize;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setPage, setFilters, clearData, setSelectedRows } = transactionDetailSlice.actions;
export default transactionDetailSlice.reducer;
