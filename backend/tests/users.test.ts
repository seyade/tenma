import { readFileSync } from "fs";
import express from "express";
import request from "supertest";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { resolvers } from "../src/resolvers";
import { UserModel } from "../src/models/User";

const typeDefs = readFileSync("./src/schemas/schema.graphql", {
  encoding: "utf-8",
});

describe("User", () => {
  let server: ApolloServer;
  let app: any;
  let userTestId: string;

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/tenma");

    server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    app = express();
    app.use(bodyParser.json());
    app.use("/graphql", expressMiddleware(server));

    const userTest = await mongoose.model("User").create({
      email: "test@email.com",
      username: "test_username",
      password: "testpassword",
    });

    userTestId = userTest._id.toString();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.stop();
  });

  it("should fetch all users", async () => {
    const query = `
      query Users {
        users {
          email
          username
        }
      }
    `;

    const response = await request(app)
      .post("/graphql")
      .send({ query })
      .expect(200);

    expect(response.body.data).toMatchObject({
      users: [
        {
          email: "test@email.com",
          username: "test_username",
        },
      ],
    });
  });

  it("should get a user by ID", async () => {
    const query = `
      query Users($id: ID!) {
        user(id: $id) {
          email
          username
        }
      }
    `;

    const response = await request(app)
      .post("/graphql")
      .send({ query, variables: { id: userTestId } })
      .expect(200);

    expect(response.body.data).toMatchObject({
      user: {
        email: "test@email.com",
        username: "test_username",
      },
    });
  });
});
