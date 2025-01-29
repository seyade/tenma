"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4500/graphql",
  }),
  cache: new InMemoryCache(),
});
