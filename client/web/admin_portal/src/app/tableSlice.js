import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  currentPage: 1,
  rowsPerPage: 10,
  sortConfig: { key: '', direction: '' }
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
  },
});

export const { setData, setPage, setRowsPerPage, setSortConfig } = tableSlice.actions;
export default tableSlice.reducer;
