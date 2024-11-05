// tableSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  rowsPerPage: 10,
  sortConfig: { key: '', direction: '' },
  searchTerm: '',
  filter: '',
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setSortConfig(state, action) {
      state.sortConfig = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setPage, setSortConfig, setSearchTerm, setFilter } = tableSlice.actions;

export default tableSlice.reducer;
