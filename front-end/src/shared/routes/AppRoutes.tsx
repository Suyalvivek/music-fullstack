import { Route, Routes } from "react-router-dom"
import Login from "../../modules/user/pages/Login"
import Home from "../../modules/music/pages/Home"
import Register from "../../modules/user/pages/Register"

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={<Home/>}></Route>
    </Routes>
    </>
  )
}

export default AppRoutes