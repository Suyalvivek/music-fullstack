import Footer from "./shared/Footer";
import Header from "./shared/Header"
import AppRoutes from "./shared/routes/AppRoutes"

const App = () => {
  return (
    <div>
      <Header></Header>
      <AppRoutes></AppRoutes>
      <Footer></Footer>

    </div>
  )
}

export default App;