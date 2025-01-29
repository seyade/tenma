"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.HOST}:4500/graphql`,
  }),
  cache: new InMemoryCache(),
});
