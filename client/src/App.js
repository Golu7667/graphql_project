import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./RegisterPage.js/Register"
import HomePage from './HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Register/>}/>
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;