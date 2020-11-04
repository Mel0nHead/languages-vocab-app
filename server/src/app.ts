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

// TODO: Add a 'Test' enity
// - BE CAREFUL: either delete everything from api or create a migration for this
// - Test should have: id, user, words (which should be many-to-many with custom property 'correct'), createdAt, updatedAt, finishedAt
// - need to be able to create, update and delete a Test, as well as get a list of all tests on a user

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
