import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  busca: null,
  de: null,
  ate: null,
  qtd: 5,
  page: 1,
};

const newsFilterFormSlice = createSlice({
  initialState: INITIAL_STATE,
  reducers: {
    filterFormChanged: (state, action) => {
      Object.assign(state, action.payload);
    },
    pageChanged: (state, action) => ({ ...state, page: action.payload.page }),
  },
  name: 'newsFilterForm',
});

export const { filterFormChanged, pageChanged } = newsFilterFormSlice.actions;

export const getNewsFilterForm = (state: any) => state.newsFilterForm;

export default newsFilterFormSlice.reducer;
