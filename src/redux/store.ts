import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from './api/bookApi'
// import bookReducer from './features/books/bookSlice'
import pageReducer from './features/pagination/pageSlice'
import tableReducer from './features/pagination/tableSlice'

export const store = configureStore({
  reducer: {
    // book: bookReducer,
    page: pageReducer,
    tablePage: tableReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch