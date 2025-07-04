import Footer from "./components/layout/Footer"
import LoadingScreen from "./components/layout/LoadingScreen";
import Navbar from "./components/layout/Navbar"
import { Outlet, useNavigation } from "react-router"

function App() {
    const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <div className="h-full min-h-screen flex flex-col justify-between items-center mx-8">
      <Navbar />
      {isNavigating && <LoadingScreen />}
      <Outlet />
      <Footer />
    </div>
  )
}

export default App