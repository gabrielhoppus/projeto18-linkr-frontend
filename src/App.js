import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResetCss } from './ResetCss.js'
import SignIn from './pages/signIn.js'
import SignUp from './pages/signUp.js'
import Timeline from "./pages/timeline.js";
import { AuthProvider } from './contexts/auth.context'
import User from "./pages/user.js";
import HashtagPage from "./pages/hashtag.js";
import 'react-tooltip/dist/react-tooltip.css';

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
        <Route path="/hashtag/:hashtag" element={<HashtagPage/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App