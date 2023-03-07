import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResetCss } from './ResetCss.js'
import SignIn from './pages/signIn.js'
import SignUp from './pages/signUp.js'
import Home from "./pages/home.js";

function App() {

  return (
    <BrowserRouter>
      <ResetCss />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App