import { z } from "zod"

const bookSchema = z.object({
  title: z.string().min(3,{message:"Minimum 3 characters"}),
  author: z.string().min(3,{message:"Minimum 3 characters"}).max(50,{message:"Maximum 50 characters"}),
  genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
  isbn: z.string().min(1,{message:"Please enter an ISBN"}),
  description: z.string().optional(),
  copies: z.coerce.number().min(0,{message:"Copies can not be less than 0"}),
  available: z.boolean().optional()
})



// export const borrowSchema = z.object({
//   book: z.string(),
//   quantity: z.coerce.number().min(0,{message:"Copies can not be less than 0"}),
//   dueDate: z.date()
// })

// export interface IBorrow{
//   book: string
//   quantity: number
//   dueDate: Date
// }

export default bookSchema;

export const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];
export const sortByList = [{value:'Name',key:'title'}, {value:'Author',key:'author'}, {value:'Creation Date',key:'createdAt'}]

export interface IQueryBody{
  filter:string,
  offset:number,
  sortBy:string,
  sort: string,
  limit: string
}

export interface IBook {
  __v: number
  _id: string
  author: string
  available: boolean
  copies: number
  createdAt: string
  description: string
  genre: 'FICTION'| 'NON_FICTION'| 'SCIENCE'| 'HISTORY'| 'BIOGRAPHY'| 'FANTASY'
  isbn: string
  title: string
  updatedAt: string
}