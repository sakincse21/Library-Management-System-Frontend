import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import bookSchema, { genres, type IBook } from "@/components/schemas"
import { useDeleteApiMutation, useUpdateBookMutation } from "@/redux/api/bookApi"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon } from "lucide-react"
import { useNavigate } from "react-router"
import { errorToast, successToast } from "@/lib/toasts"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import type z from "zod"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface IProps {
  data: IBook,
  id: string
}

export function EditBookForm(props: IProps) {
  const bookData = props.data;
  const id = props.id;
  console.log('Initial bookData: ', bookData);

  const navigate = useNavigate();
  const [deleteApi, { isLoading: isDeleteLoading }] = useDeleteApiMutation();
  const deleteConfirm = async () => {
      const res = await deleteApi(bookData._id).unwrap();
      if (res?.success === true) {
        successToast(res?.message)
        navigate("/books");
      } else if (res?.success === false) {
        errorToast(res?.message)
      }
    }

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      ...bookData
    },
  })

  const [UpdateBook, { isLoading }] = useUpdateBookMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updateBody = { ...data, id }
    console.log('Updated Data: ', updateBody);
    const res = await UpdateBook(updateBody).unwrap();
    console.log("inside submit function", res);
    if (res?.success === true) {
      successToast(res?.message)
      navigate("/books");
      form.reset();
    } else if (res?.success === false) {
      errorToast(res?.message)
    }
  }

  return (
    <Card className="w-[450px] p-5 ">
      {
        isLoading ?
          <div className="flex flex-row justify-center items-center text-lg gap-2 ">
            <Loader2Icon size={30} className="animate-spin" />
            Updating Book
          </div>
          :
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {genres.map((genre) => (
                              <SelectItem
                                key={genre}
                                value={genre}
                              >
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input placeholder="ISBN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder="Copies" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-between">
              <Button type="submit">Update</Button>
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
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are going to delete <strong>{bookData.title}</strong>. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 text-white-50" onClick={() => deleteConfirm()}>Confirm</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                }
              </AlertDialog>
            }
          </div>
            </form>
          </Form>
      }
    </Card>
  )
}