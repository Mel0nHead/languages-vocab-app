import "reflect-metadata";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await createConnection();

  // create and setup express app
  const port = 4000;
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger("dev"));

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(
      `Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

startServer();
