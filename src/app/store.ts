import { configureStore } from '@reduxjs/toolkit';

import newsFilterSlice from '@/reducers/newsFilterForm';

export const store = configureStore({
  reducer: {
    newsFilterForm: newsFilterSlice,
  },
});
