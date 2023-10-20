import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from '@apollo/server/express4';
import connectDB from './utils/connectDB';
import typeDefs from './gql/typeDefs';
import resolvers from './gql/resolvers';
import { Schema } from 'mongoose';

dotenv.config();

let schema = makeExecutableSchema({ typeDefs, resolvers });

const port = process.env.PORT || 50000;

const startApolloServer = async () => {
  const app: Application = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
  });

  connectDB();

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => await { req },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`Server is ready at http://localhost:${port}/graphql`);
};

startApolloServer();
