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
// Currently following this: https://www.youtube.com/watch?v=dBuU61ABEDs
// - add a login mutation
// - create one-to-many relationship between User and Word
// - make a db migration

const PORT = 4000;

// interface UserRequest extends express.Request {
//   user: string;
// }

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [WordResolver, UserResolver],
  });

  const server = new ApolloServer({
    schema,
    // context: ({ req }: { req: UserRequest }) => {
    //   const user = req.user || null;
    //   return { user };
    // },
  });

  await createConnection();

  // create and setup express app
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger("dev"));

  // for authorisation and authentication
  // app.use(
  //   expressJwt({
  //     secret: "MY_SECRET",
  //     algorithms: ["HS256"],
  //     credentialsRequired: false,
  //   })
  // );

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer();
