"use client";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/config";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
