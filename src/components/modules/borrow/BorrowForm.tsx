import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type IBook } from "@/components/schemas"
import { useAddBorrowMutation } from "@/redux/api/baseApi"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2Icon } from "lucide-react"
import { useNavigate } from "react-router"
import { errorToast, successToast } from "@/lib/toasts"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

interface IProps {
    data: IBook,
    id: string
}

export function BorrowForm(props: IProps) {
    const bookData = props.data;
    //   const id = props.id;
    console.log('Initial bookData: ', bookData);

    const navigate = useNavigate();

    const borrowSchema2 = z.object({
        book: z.string(),
        quantity: z.coerce.number().min(0, { message: "Quantity can not be less than 0" }).max(bookData.copies, { message: "Quantity can not be more than available copies" }),
        dueDate: z.date()
    })

    const form = useForm<z.infer<typeof borrowSchema2>>({
        resolver: zodResolver(borrowSchema2),
        defaultValues: {
            book: bookData._id,
            quantity: 0,
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
    })

    const [AddBorrow, { isLoading }] = useAddBorrowMutation();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const updateBody = { ...data }
        console.log('Updated Data: ', updateBody);
        const res = await AddBorrow(updateBody).unwrap();
        console.log("inside submit function", res);
        if (res?.success === true) {
            successToast(res?.message)
            navigate("/borrow-summary");
            form.reset();
        } else if (res?.success === false) {
            errorToast(res?.message)
        }
    }

    return (
        <Card className="w-[450px] p-5 ">
            {
                isLoading ?
                    <div className="flex flex-row justify-center items-center text-lg gap-3 ">
                        <Loader2Icon size={30} className="animate-spin" />
                        Creating New Borrow Entry
                    </div>
                    :
                    <CardContent className="space-y-3">
                        <h3 className="text-xl">{bookData.title}</h3>
                        <p><h5 className=" inline-block">Author:</h5> {bookData.author}</p>
                        <p><h5 className=" inline-block">ISBN:</h5> {bookData.isbn}</p>
                        <p><h5 className=" inline-block">Genre:</h5> {bookData.genre}</p>
                        <p className="flex flex-wrap justify-between">
                            <span><h5 className="inline-block">Copies:</h5> {bookData.copies}</span>
                            <span>{
                                bookData.available ? <span className="text-green-600">Available</span> : <span className="text-red-600">Unavailable</span>
                            }</span>
                        </p>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl>
                                                <Input type='number' placeholder="Quantity" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Due Date</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="noShadow"
                                                            className="w-[280px] justify-start text-left font-base"
                                                        >
                                                            <CalendarIcon />
                                                            {field ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto border-0! p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            fromDate={addDays(new Date(), 1)}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={!bookData.available}>Borrow</Button>
                            </form>
                        </Form>
                    </CardContent>
            }
        </Card>
    )
}