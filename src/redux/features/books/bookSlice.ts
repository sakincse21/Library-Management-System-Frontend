// import type { IBook } from '@/components/schemas'
// import type { RootState } from '@/redux/store'
// import { createSlice } from '@reduxjs/toolkit'

// interface IInitialState {
//     value: Pick<IBook, 'title' | 'author' | 'available' | 'copies' | 'description' | 'genre'  | 'isbn'>
// }

// const initialState: IInitialState = {
//     value: {
//         // __v: 0,
//         // _id: '',
//         author: '',
//         available: true,
//         copies: 0,
//         // createdAt: '',
//         description: '',
//         genre: 'FICTION',
//         isbn: '',
//         title: '',
//         // updatedAt: ''
//     }
// }


// export const bookSlice = createSlice({
//     name: 'book',
//     initialState,
//     reducers: {
//         updateBook: (state, action) => {
//             const payload = action.payload;
//             state.value={...state.value , ...payload}
//         }
//     },
// })

// // export const {} = bookSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const singleBook = (state: RootState) => state.book.value

// export default bookSlice.reducer