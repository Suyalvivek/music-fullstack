import { useEffect } from "react";
import Footer from "./shared/Footer";
import Header from "./shared/Header"
import AppRoutes from "./shared/routes/AppRoutes"
import { useUserStore } from "./modules/user/store/user-store";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  const { checkAuthStatus } = useUserStore();
  
  useEffect(() => {
    // Check authentication status when the app loads
    checkAuthStatus();
  }, [checkAuthStatus]);
  return (
    <div>
      <Header></Header>
      <AppRoutes></AppRoutes>
      <Footer></Footer>
      <Toaster />
    </div>
  )
}

export default App;