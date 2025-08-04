import { Route, Routes } from "react-router-dom"
import Login from "../../modules/user/pages/Login"
import Home from "../../modules/music/pages/Home"
import Register from "../../modules/user/pages/Register"
import Dashboard from "@/modules/user/pages/Dashboard"
import AddSong from "@/modules/music/pages/AddSong"
import MyLibrary from "@/modules/music/pages/MyLibrary"

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        
        <Route path="/" element={<Home/>}></Route>
        <Route path="/add-song" element={<AddSong/>}></Route>
        <Route path="/lib" element={<MyLibrary/>}></Route>

    </Routes>
    </>
  )
}

export default AppRoutes