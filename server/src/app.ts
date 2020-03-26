import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as logger from "morgan";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({ typeDefs, resolvers, schema });
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
