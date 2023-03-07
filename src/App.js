import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResetCss } from './ResetCss.js'
import SignIn from './pages/signIn.js'
import SignUp from './pages/signUp.js'
import Home from "./pages/home.js";
import { AuthProvider } from './contexts/auth.context'

function App() {

  return (
    <BrowserRouter>
      <ResetCss />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App