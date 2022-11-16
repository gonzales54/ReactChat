import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeView from "./components/views/HomeView"
import ChatView from "./components/views/ChatView"
import AddUserView from "./components/views/AddUserView"
import LoginView from "./components/views/LoginView"
import RegisterView from "./components/views/RegisterView"
import NotFoundView from "./components/views/NotFound"
import { AuthProvider } from "./Context/AuthContext"


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <HomeView />
          } />
          <Route path="/:user" element={
            <ChatView />
          } />
          <Route path="/adduser" element={
            <AddUserView />
          } />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
