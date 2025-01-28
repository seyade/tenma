import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Book {
    title: string
    price: Int
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "Planet Namek",
    price: 25.45,
  },
  {
    title: "Planet Earth",
    price: 15.89,
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4500 },
});

console.log(`Server running on ${url}`);
