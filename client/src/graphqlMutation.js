import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
      msg
    }
  }
`;

export const UPDATE_USER=gql`
mutation UpdateUser($id:ID!,$name:String!,$email:String!){
    updateUser(id:$id,name:$name,email:$email){
        email,
        id,
        name
    }
}
`

export const DELETE_USER=gql`
mutation DeleteUser($id:ID!){
  deleteUser(id:$id)
}
`