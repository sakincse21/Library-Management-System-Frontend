import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'


interface ISummary {
    totalQuantity: number,
    book: {
        title: string
        isbn: string
    }
}

interface IProps {
    data: Array<ISummary>
}

const BorrowSummary = (props: IProps) => {
    const summaryData = props.data;
    const initialValue = 0;
    const sumWithInitial = summaryData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalQuantity,
        initialValue,
    );
    console.log(sumWithInitial);


    return (
        <div className='w-full md:mx-5'>
            <Table >
                <TableCaption className="text-foreground">
                    A list of total borrow summary.
                </TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead className="w-[100px]">ISBN</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Total Quantity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {summaryData.map((data) => (
                        <TableRow key={data.book.isbn}>
                            <TableCell className="font-base">{data.book.isbn}</TableCell>
                            <TableCell >{data.book.title}</TableCell>
                            <TableCell className="text-right">{data.totalQuantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Total borrows</TableCell>
                        <TableCell className="text-right">{sumWithInitial}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default BorrowSummary