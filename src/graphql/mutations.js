import { gql } from "@apollo/client";

export const SIGN_Up_USER = gql`
  mutation createUser($newUser: UserInput) {
    user: signUpUser(newUser: $newUser) {
      email
      name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($newSignInUser: UserSigninInput) {
    user: SigninUser(newSignInUser: $newSignInUser) {
      userId
      token
    }
  }
`;

export const ADD_CITY = gql`
  mutation addCities($newCity: CityInput) {
    cities: addCity(newCity: $newCity) {
      label
      lat
      lon
    }
  }
`;

export const DELETE_QUERY = gql`
  mutation DeleteCities($cityId: String) {
    cities: deleteCities(cityId: $cityId) {
      label
    }
  }
`;
