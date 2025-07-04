import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from './api/baseApi'
// import bookReducer from './features/books/bookSlice'
import pageReducer from './features/pagination/pageSlice'

export const store = configureStore({
  reducer: {
    // book: bookReducer,
    page: pageReducer,
    [bookApi.reducerPath]: bookApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch