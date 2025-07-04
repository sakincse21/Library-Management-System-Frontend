import { zodResolver } from "@hookform/resolvers/zod"
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
import bookSchema from "@/components/schemas"
import { genres } from "@/components/schemas"
import { useAddBookMutation } from "@/redux/api/baseApi"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type z from "zod"
import { Loader2Icon } from "lucide-react"
import { useNavigate } from "react-router"
import { errorToast, successToast } from "@/lib/toasts"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function CreateBookForm() {

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      description: "",
      copies: 0,
      available: true
    },
  })

  const navigate = useNavigate();
  const [AddBook, { isLoading, isSuccess }] = useAddBookMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Data: ', data);
    const res = await AddBook(data).unwrap();
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
          <div className="flex flex-row justify-center items-center text-lg gap-2">
            <Loader2Icon size={30} className="animate-spin" />
            Creating New Book Entry
          </div>
          :
          !isSuccess && <Form {...form}>
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
                        value={field.value || ''}
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
              <div className="text-red-600 text-xs">Availability set automatically based on copies number</div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
      }
    </Card>
  )
}