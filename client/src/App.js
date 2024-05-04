import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from "./RegisterPage"
import HomePage from './HomePage';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/home" element={  <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
