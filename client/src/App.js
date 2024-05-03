import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from "./RegisterPage"
import HomePage from './HomePage';
import { gql, useQuery } from "@apollo/client";
import { useEffect } from 'react';
import Test from "./Test"

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
