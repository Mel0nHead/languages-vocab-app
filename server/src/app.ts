import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { WordResolver } from "./resolvers/WordResolver";
import { buildSchema } from "type-graphql";

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [WordResolver],
  });

  const server = new ApolloServer({ schema });
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
