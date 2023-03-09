import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResetCss } from './ResetCss.js'
import SignIn from './pages/signIn.js'
import SignUp from './pages/signUp.js'
import Timeline from "./pages/timeline.js";
import { AuthProvider } from './contexts/auth.context'
import User from "./pages/user.js";

function App() {

  return (
    <BrowserRouter>
      <ResetCss />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/timeline" element={<Timeline/>}/>
        <Route path="/user/:id" element={<User />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App