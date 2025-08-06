import { Route, Routes } from "react-router-dom"
import Login from "../../modules/user/pages/Login"
import Register from "../../modules/user/pages/Register"
import Dashboard from "@/modules/user/pages/Dashboard"
import AddSong from "@/modules/music/pages/AddSong"
import MyLibrary from "@/modules/music/pages/MyLibrary"
import HomePage from "../../modules/user/pages/HomePage"
import Home from "@/modules/music/pages/Home"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
  return (
    <>
    <Routes>
      {/* Public routes - accessible when logged out */}
      <Route path="/" element={
        <ProtectedRoute requireAuth={false}>
          <HomePage/>
        </ProtectedRoute>
      }></Route>
      <Route path="/login" element={
        <ProtectedRoute requireAuth={false}>
          <Login/>
        </ProtectedRoute>
      }></Route>
      <Route path="/register" element={
        <ProtectedRoute requireAuth={false}>
          <Register/>
        </ProtectedRoute>
      }></Route>

      {/* Protected routes - require authentication */}
      <Route path="/home" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }></Route>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }></Route>
      <Route path="/add-song" element={
        <ProtectedRoute>
          <AddSong/>
        </ProtectedRoute>
      }></Route>
      <Route path="/lib" element={
        <ProtectedRoute>
          <MyLibrary/>
        </ProtectedRoute>
      }></Route>
      
    </Routes>
    </>
  )
}

export default AppRoutes