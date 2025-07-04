import { useGetAllBooksQuery } from "@/redux/api/baseApi"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'


import BookCard from "@/components/modules/books/BookCard"
import { genres, type IBook, sortByList } from "@/components/schemas";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nextPage, prevPage, setFilter, setLimit, setPerPage, setSort, setSortBy, setTotalPage } from "@/redux/features/pagination/pageSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Books = () => {
  const filter = useAppSelector((state) => state.page.filter);
  const sortBy = useAppSelector((state) => state.page.sortBy);
  const sort = useAppSelector((state) => state.page.sort);
  const limit = useAppSelector((state) => state.page.limit);
  const page = useAppSelector((state) => state.page.page);
  const totalPage = useAppSelector((state) => state.page.totalPage);
  const prev = useAppSelector((state) => state.page.prev);
  const next = useAppSelector((state) => state.page.next);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetAllBooksQuery({
    filter: filter === 'all' ? '' : filter,
    offset: ((page - 1) * parseInt(limit)),
    sortBy,
    sort,
    limit
  }, {
  });


  useEffect(() => {
    dispatch(setPerPage(limit))
  }, [limit, dispatch])

  if (isLoading) {
    return <LoadingScreen />
  }

  console.log(data.data);
  const allBooks = data?.data;
  dispatch(setTotalPage(data?.totalCount));

  const handleNext = () => {
    dispatch(nextPage());
  }
  const handlePrev = () => {
    dispatch(prevPage());
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-5 gap-8 px-3">
      <div className="w-full flex justify-center sm:justify-end gap-2">
        <span>
          <Select
            value={filter}
            onValueChange={(value) => dispatch(setFilter(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  key={'all'}
                  value={'all'}
                >
                  All
                </SelectItem>
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
        </span>
        <span>
          <Select
            value={sortBy}
            onValueChange={(value)=>dispatch(setSortBy(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortByList.map((item) => (
                  <SelectItem
                    key={item.key}
                    value={item.key}
                  >
                    {item.value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        <span>
          <Select
            value={sort}
            onValueChange={(value)=>dispatch(setSort(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  key={'asc'}
                  value={'asc'}
                >
                  Ascending
                </SelectItem>
                <SelectItem
                  key={'desc'}
                  value={'desc'}
                >
                  Descending
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        <span>
          <Select
            value={limit}
            onValueChange={(value)=>dispatch(setLimit(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  key={'12'}
                  value={'12'}
                >
                  12
                </SelectItem>
                <SelectItem
                  key={'24'}
                  value={'24'}
                >
                  24
                </SelectItem>
                <SelectItem
                  key={'36'}
                  value={'36'}
                >
                  36
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
      </div>
      {!isLoading && (
        allBooks ?
          <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {
              allBooks?.map((book: IBook) => <BookCard book={book} key={book?._id} />)
            }
          </div>
          :
          <p className="text-center text-xl">No Books Found 😓</p>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {prev &&
              <PaginationLink className="cursor-pointer" onClick={handlePrev}><ChevronLeftIcon /></PaginationLink>
            }
          </PaginationItem>
          <PaginationItem>
            {page ? <Button variant={'noShadow'} disabled>
              {page} / {totalPage}
            </Button> : ""}
          </PaginationItem>
          <PaginationItem>
            {next && allBooks &&
              <PaginationLink className="cursor-pointer" onClick={handleNext}><ChevronRightIcon /></PaginationLink>
            }
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  )
}

export default Books