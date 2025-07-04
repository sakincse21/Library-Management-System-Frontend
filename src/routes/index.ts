import App from "@/App";
import Books from "@/pages/Books";
import Borrow from "@/pages/BorrowPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
import SingleBook from "@/pages/SingleBook";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path:'/',
        // element: <App />
        Component: App,
        children:[
            {
                path:'books',
                Component: Books
            },
            {
                path:'books/:id',
                Component: SingleBook
            },
            {
                path: 'borrow/:id',
                Component: Borrow
            },
            // {
            //     path: 'addbook',
            //     Component: AddBook
            // },
            {
                path: 'create-book',
                Component: CreateBook
            },
            {
                path: 'edit-book/:id',
                Component: EditBook
            },
            {
                path: 'borrow-summary',
                Component: BorrowSummaryPage
            },
            {
                index: true,
                Component: Books
            }
        ]
    }
])

export default router;