import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import mongoose from "mongoose";

import resolvers from "./resolvers";

interface GQLContext {
  token?: string;
}

export const startServer = async () => {
  const PORT = process.env.PORT || 4500;
  const app = express();

  const typeDefs = readFileSync("./src/graphql/schemas/schema.graphql", {
    encoding: "utf-8",
  });

  const server = new ApolloServer<GQLContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  await mongoose.connect("mongodb://localhost:27017/tenma");
  console.log("Connecting to db...");

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/graphql`);
  });
};
