import { gql } from "@apollo/client";

export const SIGN_Up_USER = gql`
  mutation createUser($newUser: UserInput) {
    user: signUpUser(newUser: $newUser) {
      _id
      email
      name
    }
  }
`;
