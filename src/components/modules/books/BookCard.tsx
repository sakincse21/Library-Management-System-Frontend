import type { IBook } from "@/components/schemas";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { errorToast, successToast } from "@/lib/toasts";
import { useDeleteApiMutation } from "@/redux/api/baseApi";
import { LoaderIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";


interface IBookCardProps {
    book: IBook;
}

const BookCard = (props: IBookCardProps) => {
    const [deleteApi, { isLoading, isSuccess }] = useDeleteApiMutation();
    const navigate = useNavigate();
    const book = props.book;
    const bookDetailPage = () => {
        navigate(`/books/${book._id}`);
    }
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
        <Card className="w-full hover:shadow-none" >
            <CardContent onClick={() => bookDetailPage()} className="cursor-pointer " >
                <h3 className="text-lg">{book.title}</h3>
                <div><h5 className=" inline-block">Author:</h5> {book.author}</div>
                <div><h5 className=" inline-block">ISBN:</h5> {book.isbn}</div>
                <div><h5 className=" inline-block">Genre:</h5> {book.genre}</div>
                <p className="flex flex-wrap justify-between">
                    <span><span className="inline-block">Copies:</span> {book.copies}</span>
                    <span>{
                        book.available ? <span className="text-green-600">Available</span> : <span className="text-red-600">Unavailable</span>
                    }</span>
                </p>
            </CardContent>
            <CardFooter className="mt-auto flex flex-col gap-3 w-full">
                <Link to={`/borrow/${book._id}`} className="w-full">
                    <Button disabled={!book.available} className="w-full">
                        Borrow
                    </Button>
                </Link>
                <div className="w-full flex justify-between">
                    <Link to={`/edit-book/${book._id}`}>
                        <Button className=" cursor-pointer">
                            Update
                        </Button>
                    </Link>
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

                </div>
            </CardFooter>
        </Card>
    )
}

export default BookCard