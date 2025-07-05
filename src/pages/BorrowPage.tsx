import ErrorScreen from "@/components/layout/ErrorScreen";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { BorrowForm } from "@/components/modules/borrow/BorrowForm";
import { useGetSingleBooksQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router"



const BorrowPage = () => {
  const params = useParams();
  const id = params?.id;
  console.log(id);

  const { data, isLoading: isFetchLoading } = useGetSingleBooksQuery(id, {});
  
  if (isFetchLoading) {
    return <LoadingScreen />
  }
  if(!data.success){
    return <ErrorScreen />
  }
  
  const bookData = data?.data;

  return (
    <div className="w-full h-full flex justify-center items-center my-5">
      <BorrowForm data={bookData} id={id as string}  />
    </div>
  )
}

export default BorrowPage