import ErrorScreen from "@/components/layout/ErrorScreen";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { EditBookForm } from "@/components/modules/books/EditBookForm"
import { useGetSingleBooksQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router"



const EditBook = () => {
  const params = useParams();
  const id = params?.id;
  console.log(id);

  const { data, isLoading: isFetchLoading } = useGetSingleBooksQuery(id, {});
  //   if(isFetchLoading){
  //     return <div>Loading...</div>
  //   }
  if (isFetchLoading) {
    return <LoadingScreen />
  }

  if(!data || !data.success){
    return <ErrorScreen />
  }

  const bookData = data?.data;

  return (
    <div className="w-full h-full flex justify-center items-center my-5">
      <EditBookForm data={bookData} id={id as string} />
    </div>
  )
}

export default EditBook