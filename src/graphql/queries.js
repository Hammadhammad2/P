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

export const GET_ALL_CITIES = gql`
  query getCities($userID: String) {
    cities: getcities(userID: $userID) {
      label
      _id
      lat
      lon
      placeId
    }
  }
`;
