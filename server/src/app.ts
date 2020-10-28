import "reflect-metadata";
import express, { Request } from "express";
import expressJwt from "express-jwt";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { WordResolver } from "./resolvers/WordResolver";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";

// following this tutorial for auth: https://www.youtube.com/watch?v=dBuU61ABEDs

const PORT = 4000;

interface UserRequest extends Request {
  user: any;
}

const startServer = async () => {
  const schema = await buildSchema({
    resolvers: [WordResolver, UserResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: { req: UserRequest }) => {
      const user = req.user || null;
      return { user };
    },
  });

  await createConnection();

  const app = express();

  app.use(
    expressJwt({
      secret: "SUPER_SECRET",
      algorithms: ["HS256"],
      credentialsRequired: false,
    })
  );

  app.use(bodyParser.json(), cors(), logger("dev"));
  apolloServer.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

startServer();
