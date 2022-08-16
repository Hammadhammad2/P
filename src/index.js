import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import jwt_decode from "jwt-decode";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
  // Additional options
});

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem("token");

  if (token) {
    const userToken = jwt_decode(token);
    const isExpired = userToken.exp * 1000 > Date.now();
    if (!isExpired) {
      localStorage.clear();
      window.location.replace("/login");
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

reportWebVitals();
