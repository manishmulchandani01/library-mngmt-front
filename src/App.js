import Navbar from "./Components/Navbar.js";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home.js";
import Students from "./Screens/Students.js";
import Books from "./Screens/Books.js";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar></Navbar>
                <div className="Body">
                    <Routes>
                        <Route path="/" element={<Home></Home>}></Route>
                        <Route
                            path="/students"
                            element={<Students></Students>}
                        ></Route>
                        <Route path="/books" element={<Books></Books>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
