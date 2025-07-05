// Need to use the React-specific entry point to import createApi
import type { IQueryBody } from '@/components/schemas'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://l2-b5-assignment3.vercel.app/api' }),
    tagTypes: ['books', 'book', 'summary', 'tablebooks'],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: (body:IQueryBody) => `/books?offset=${body.offset}&filter=${body.filter}&sortBy=${body.sortBy}&sort=${body.sort}&limit=${body.limit}`,
            providesTags: ['books']
        }),
        getAllTableBooks: builder.query({
            query: (body:IQueryBody) => `/books?offset=${body.offset}&filter=${body.filter}&sortBy=${body.sortBy}&sort=${body.sort}&limit=${body.limit}`,
            providesTags: ['tablebooks']
        }),
        getSingleBooks: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ['book']
        }),
        updateBook: builder.mutation({
            query: (body) => ({
                url: `/books/${body.id}`,
                method: "PUT",
                body: { ...body }
            }),
            invalidatesTags: ["books", 'book', 'summary', 'tablebooks']
        }),
        addBook: builder.mutation({
            query: (body) => ({
                url: `/books`,
                method: "POST",
                body
            }),
            invalidatesTags: ["books", 'tablebooks']
        }),
        deleteApi: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["books", 'summary', 'book', 'tablebooks']
        }),
        getBorrowSummary: builder.query({
            query: () => '/borrow',
            providesTags: ['summary']
        }),
        addBorrow: builder.mutation({
            query: (body) => ({
                url: `/borrow`,
                method: "POST",
                body
            }),
            invalidatesTags: ['books', 'summary', 'book', 'tablebooks']
        }),
    }),
})

export const { useGetBorrowSummaryQuery, useAddBorrowMutation, useGetAllBooksQuery, useGetSingleBooksQuery, useAddBookMutation, useDeleteApiMutation, useUpdateBookMutation, useGetAllTableBooksQuery } = bookApi