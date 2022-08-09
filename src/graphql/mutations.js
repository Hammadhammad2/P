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


export const LOGIN_USER = gql`
  mutation LoginUser($newSignInUser: UserSigninInput) {
    user: SigninUser(newSignInUser: $newSignInUser) {
    token
    }
  }
`;
