import "reflect-metadata";
import express from "express";
import expressJwt from "express-jwt";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import { createConnection, useContainer } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { WordResolver } from "./entities/word/word.resolver";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./entities/user/user.resolver";
import { Container } from "typedi";
import { TestResolver } from "./entities/test/test.resolver";

const PORT = 4000;

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [WordResolver, UserResolver, TestResolver],
    container: Container,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  useContainer(Container);
  await createConnection();

  const app = express();

  app.use(
    expressJwt({
      secret: "SUPER_SECRET",
      algorithms: ["HS256"],
      credentialsRequired: false,
    }),
    bodyParser.json(),
    cors(),
    logger("dev")
  );

  apolloServer.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

startServer();
