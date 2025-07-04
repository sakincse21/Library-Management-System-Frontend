import { Link } from "react-router"

const ErrorScreen = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <h3 className="text-4xl font-bold">Something Went Wrong...!😵</h3>
      <Link to={'/'}>
        <span className="text-2xl font-bold link-underline">Visit Home</span>
      </Link>
    </div>
  )
}

export default ErrorScreen