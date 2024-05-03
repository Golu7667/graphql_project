import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';

const GET_USER = gql`
  query GetUser($token: ID!) {
    getUser(token: $token) {
      email
      id
      name
      password
    }
  }
`;

const Test = () => {
  // Retrieve the token from cookies
  const token = Cookies.get('token');

  // Execute the GraphQL query using the useQuery hook
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { token }
  });

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error: {error.message}</p>;

  // Once data is loaded, render user profile
  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {data.getUser.id}</p>
      <p>Name: {data.getUser.name}</p>
      <p>Email: {data.getUser.email}</p>
      {/* You may want to omit rendering the password for security reasons */}
    </div>
  );
};

export default Test;
