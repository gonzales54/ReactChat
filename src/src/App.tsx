import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeView from "./components/views/HomeView"
import ChatView from "./components/views/ChatView"
import AddUserView from "./components/views/AddUserView"
import LoginView from "./components/views/LoginView"
import RegisterView from "./components/views/RegisterView"
import NotFoundView from "./components/views/NotFound"
import { AuthProvider } from "./Context/AuthContext"
import UserGuard from "./Guard/UserGuard"


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <UserGuard>
              <HomeView />
            </UserGuard>
          } />
          <Route path="/:user" element={
            <UserGuard>
              <ChatView />
            </UserGuard>
          } />
          <Route path="/adduser" element={
            <UserGuard>
              <AddUserView />
            </UserGuard>
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
