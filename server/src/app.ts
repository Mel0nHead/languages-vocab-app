import "reflect-metadata";
import express from "express";
// import expressJwt from "express-jwt";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { WordResolver } from "./resolvers/WordResolver";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";

// TODO:
// - delete all users and words from db
// - update the add, update and delete word mutations so that they add them to the specific user

const PORT = 4000;

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [WordResolver, UserResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  await createConnection();

  // create and setup express app
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger("dev"));
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer();
