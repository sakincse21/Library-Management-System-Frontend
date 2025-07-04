import ErrorScreen from "@/components/layout/ErrorScreen"
import LoadingScreen from "@/components/layout/LoadingScreen"
import BorrowSummary from "@/components/modules/borrow/BorrowSummary"
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi"

const BorrowSummaryPage = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery({}, {
    refetchOnMountOrArgChange: false
  })

  if (isLoading) {
    return <LoadingScreen />
  }
  if (!data.success) {
    return <ErrorScreen />
  }
  const summaryData = data.data;
  console.log(summaryData);
  
  return (
    <div className="w-full h-full flex justify-center items-center my-5">
      {
        summaryData?.length ?
          <BorrowSummary data={summaryData} />
          :
          <p className="text-center text-xl">No Records Found 😓</p>
      }
    </div>
  )
}

export default BorrowSummaryPage