import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query getAllUser {
    users {
      _id
      name
      email
      phoneno
      password
      confirmpassword
    }
  }
`;
