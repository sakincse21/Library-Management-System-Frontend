import ErrorScreen from "@/components/layout/ErrorScreen";
import LoadingScreen from "@/components/layout/LoadingScreen";
import type { IBook } from "@/components/schemas";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { errorToast, successToast } from "@/lib/toasts";
import { useDeleteApiMutation, useGetSingleBooksQuery } from "@/redux/api/bookApi"
import { Loader2Icon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";

const SingleBook = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params?.id;
  const { data, isLoading: isBookLoading } = useGetSingleBooksQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  const [deleteApi, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] = useDeleteApiMutation();
  
  if (isBookLoading) {
    return <LoadingScreen />
  }

  if(!data || !data.success){
    return <ErrorScreen  />
  }

  const book:IBook = data?.data;
  console.log(book);

  console.log(book);
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
    <div className="w-full h-full flex justify-center items-center gap-4 mx-auto my-5">
      <Card className="w-[520px] shadow-none " >
        <CardContent className="space-y-4" >
          <h3 className="text-xl">{book.title}</h3>
          <div><h5 className=" inline-block">Author:</h5> {book.author}</div>
          <div><h5 className=" inline-block">ISBN:</h5> {book.isbn}</div>
          <div><h5 className=" inline-block">Genre:</h5> {book.genre}</div>
          <div><h5 className=" inline-block">Description:</h5> {book.description}</div>
          <p className="flex flex-wrap justify-between">
            <span><h5 className="inline-block">Copies:</h5> {book.copies}</span>
            <span>{
              book.available ? <span className="text-green-600">Available</span> : <span className="text-red-600">Unavailable</span>
            }</span>
          </p>
        </CardContent>
        <CardFooter className="mt-auto flex flex-col gap-3">
          <div className="w-full flex justify-between">
            <Link to={`/borrow/${book._id}`}>
              <Button disabled={!book.available}>
                Borrow
              </Button>
            </Link>
            <Link to={`/edit-book/${book._id}`}>
              <Button>
                Update
              </Button>
            </Link>
            {
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'danger'}>Delete</Button>
                </AlertDialogTrigger>
                {
                  isDeleteLoading ?
                    <AlertDialogContent>
                      <Button className="my-5" variant={'neutral'} disabled><Loader2Icon className=" animate-spin" /> Deleting</Button>
                    </AlertDialogContent>
                    :
                     !isDeleteSuccess && <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are going to delete <strong>{book.title}</strong>. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 " onClick={() => deleteConfirm()}>Confirm</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                }
              </AlertDialog>
            }
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SingleBook