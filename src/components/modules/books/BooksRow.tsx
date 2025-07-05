
import { Link, useNavigate } from "react-router";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDeleteApiMutation } from "@/redux/api/bookApi";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { errorToast, successToast } from "@/lib/toasts";
import type { IBook } from "@/components/schemas";

interface IBookCardProps {
  book: IBook;
}

const BooksRow = (props: IBookCardProps) => {
  const [deleteApi, { isLoading, isSuccess }] = useDeleteApiMutation();
  const navigate = useNavigate();
  const book = props.book;
  const deleteConfirm = async () => {
    const res = await deleteApi(book._id).unwrap();
    if (res?.success === true) {
      successToast(res?.message)
      navigate("/books");
    } else if (res?.success === false) {
      errorToast(res?.message)
    }
  }
  return (
    <TableRow key={book.isbn}>
      <TableCell className="font-base" >{book.isbn}</TableCell>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.author}</TableCell>
      <TableCell>{book.genre}</TableCell>
      <TableCell>{book.copies}</TableCell>
      <TableCell>{book.available ? <span className="text-green-600">Available</span> : <span className="text-red-600">Unavailable</span>}</TableCell>
      <TableCell>
        <Button disabled={!book.available} className="w-full">
          {
            book.available ?
              <Link to={`/borrow/${book._id}`} className="w-full">
                Borrow
              </Link>
              :
              'Borrow'
          }
        </Button>
      </TableCell>
      <TableCell>
        <Link to={`/books/${book._id}`}>
          <Button className=" cursor-pointer">
            View
          </Button>
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/edit-book/${book._id}`}>
          <Button className=" cursor-pointer">
            Update
          </Button>
        </Link>
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={'danger'}>Delete</Button>
          </AlertDialogTrigger>
          {
            isLoading ?
              <AlertDialogContent>
                <Button className="my-5" variant={'neutral'} disabled><LoaderIcon className=" animate-spin" /> Deleting</Button>
              </AlertDialogContent>
              :
              !isSuccess && <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You are going to delete <strong>{book.title}</strong>. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600" onClick={() => deleteConfirm()}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
          }
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}

export default BooksRow