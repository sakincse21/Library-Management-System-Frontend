import type { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  page: number,
  totalCount: number,
  totalPage: number,
  prev: boolean,
  next: boolean,
  perPage: number,
  filter: string,
  sortBy: string,
  sort: string,
  limit: string
}

const initialState: IInitialState = {
  page:1,
  totalCount:1,
  totalPage: 1,
  perPage: 12,
  prev: false,
  next: false,
  sort: 'asc',
  sortBy: 'title',
  limit: '12',
  filter: 'all'
}

export const tableSlice = createSlice({
  name: 'tablePage',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page=(state.page<state.totalPage)?state.page+1:state.totalPage;
      state.next=(state.page===state.totalPage)?false:true;
      state.prev=(state.page===1)?false:true;
    },
    prevPage: (state) => {
      state.page=(state.page-1)<=0?1:state.page-1;
      state.prev=(state.page===1)?false:true;
      state.next=(state.page===state.totalPage)?false:true;
    },
    setTotalPage: (state,action) => {
      state.totalCount=action.payload
      if(state.totalCount<=0) state.page=1;
      state.totalPage = Math.ceil(state.totalCount / state.perPage);
      if(state.page>state.totalPage) {state.page=state.totalPage;state.next=false}
      if(state.totalPage>1 && state.totalPage>state.page) state.next=true;
      else state.next=false
      if(state.page<=1) state.prev=false
    },
    setPerPage:(state,action)=>{
      const show = parseInt(action.payload) || 12;
      state.perPage=show;
    },
    setFilter: (state,action)=>{
      const filter = action.payload;
      state.filter=filter
    },
    setSortBy: (state,action)=>{
      const sortBy = action.payload;
      state.sortBy=sortBy
    },
    setSort: (state,action)=>{
      const sort = action.payload;
      state.sort=sort
    },
    setLimit: (state,action)=>{
      const limit = action.payload;
      state.limit=limit
    },
  },
});

export const { nextPage, prevPage, setTotalPage, setPerPage, setFilter, setSort, setSortBy, setLimit } = tableSlice.actions;
export const currentPage = (state: RootState) => state.page

export default tableSlice.reducer;
