import Header from "./Components/Header"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"
import About from "./Pages/About"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import { Routes, Route } from "react-router-dom"
import Foooter from "./Components/Foooter"
import PrivateRoute from "./Components/PrivateRoute"
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute"
import Createpost from "./Pages/Createpost"
import UpdatePost from "./Pages/UpdatePost"
import PostPage from "./Pages/PostPage"
import User from "./Pages/User"
import Search from "./Pages/Search"
function App() {
  
  return (
    <>
    <Header></Header>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/About" element={<About/>}></Route>
      <Route path="/sign-up" element={<Signup/>}></Route>
      <Route path="/sign-in" element={<Signin/>}></Route>
      <Route path="/search" element={<Search/>}></Route>
      <Route element={<PrivateRoute/>}>
          <Route path="/Dashboard" element={<Dashboard/>}>
          </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path="/create-post" element={<Createpost/>}></Route>
      <Route path="/update-post/:postId" element={<UpdatePost/>}></Route>
      <Route path="/user/:userId" element={<User/>}></Route>
      </Route>
      </Route>
      <Route path="/post/:postSlug" element={<PostPage/>}></Route>
     </Routes>
    <Foooter></Foooter>
    </>
  )
}

export default App
