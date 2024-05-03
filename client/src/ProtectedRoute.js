// ProtectedRoute.js

import React from 'react';
import { Route,Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { gql, useQuery } from "@apollo/client";


const ProtectedRoute = ({ children }) => {

 
  const isTokenExpired = async() => {
    const token = Cookies.get('token');
  
    console.log(Cookies.get('token'))
    
   return token;
  };

  return (
    <>{(
      !isTokenExpired() ? <Navigate to="/" /> :children)}
        
</>
  );
};

export default ProtectedRoute;
