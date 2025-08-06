import { Route, Routes } from "react-router-dom"
import Login from "../../modules/user/pages/Login"
import Register from "../../modules/user/pages/Register"
import Dashboard from "@/modules/user/pages/Dashboard"
import AddSong from "@/modules/music/pages/AddSong"
import MyLibrary from "@/modules/music/pages/MyLibrary"
import HomePage from "../../modules/user/pages/HomePage"
import Home from "@/modules/music/pages/Home"
import Trending from "@/modules/user/pages/Trending"

const AppRoutes = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/add-song" element={<AddSong/>}></Route>
        <Route path="/lib" element={<MyLibrary/>}></Route>
        <Route path="/trending" element={<Trending></Trending>}></Route>

    </Routes>
    </>
  )
}

export default AppRoutes