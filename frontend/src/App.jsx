import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/home"
import About from "./pages/About"
import Disclaimer from "./pages/Disclaimer"
import ReturnPolicy from "./pages/ReturnPolicy"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/about" element = {<About />}/>
        <Route path="/disclaimer" element = {<Disclaimer />}/>
        <Route path="/return" element = {<ReturnPolicy />}/>
        <Route path="/login" element = {<Login />}/>
        <Route path="/register" element = {<Register />}/>
      </Routes>

      <Footer/>
    </Router>
  )
}

export default App