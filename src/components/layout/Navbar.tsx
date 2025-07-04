import { Link } from "react-router"
import { ModeToggle } from "../ui/mode-toggle"
import { Button } from "../ui/button"
import { BookOpenIcon, MenuIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between px-3 py-5 mb-5 gap-3">
      <Link to={'/'} className="mr-auto">
        <div className="flex items-center gap-2 w-full">
          <BookOpenIcon size={28} /> <h1 className="text-4xl ">Sakin's Library</h1>
        </div>
      </Link>
        <ModeToggle />
      <div className="hidden lg:flex items-center gap-4 ">
        <Link to={'books'} >
          <Button variant={'neutral'} className="text-xl font-bold">All Books</Button>
        </Link>
        <Link to={'create-book'} >
          <Button variant={'neutral'} className="text-xl font-bold">Add New Book</Button>
        </Link>
        <Link to={'borrow-summary'} >
          <Button variant={'neutral'} className="text-xl font-bold">Borrow Summary</Button>
        </Link>
        {/* <ModeToggle /> */}
      </div>
      <div className="block lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"neutral"}>
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 mt-5">
            <Link to={'books'} >
              <DropdownMenuItem className="text-xl font-bold">
                All Books
              </DropdownMenuItem>
            </Link>
            <Link to={'create-book'} >
              <DropdownMenuItem className="text-xl font-bold">
                Add Book
              </DropdownMenuItem>
            </Link>
            <Link to={'borrow-summary'} >
              <DropdownMenuItem className="text-xl font-bold">
                Borrow Summary
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar