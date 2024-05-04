import { gql } from "@apollo/client";

export const GET_USER = gql`
query GetUser($token: ID!) {
  getUser(token: $token) {
    email
    id
    name
    password
  }
}
`;