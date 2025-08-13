import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { ApolloServer } from "apollo-server-express";
import { getUserFromToken } from "./middleware/auth";
import resolvers from "./grapgql/resolvers/index";
import typeDefs from "./grapgql/typeDefs/index";
import type {Request} from "express"
const app: Application = express();
app.use(cors());
dotenv.config();
app.use(express.json());
const PORT = 8000;

async function startServer() {
  await connectDB();

  //1. Setup Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }: {req: Request}) => {
      const user = getUserFromToken(req);
      console.log("ERER",user)
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app: app as any });

  app.listen(PORT,"192.168.1.68", () => console.log(`Server is running port ${PORT}`));
}

startServer().catch((err) => {
  console.error("Server failed to start", err);
});


// '192.168.1.68'
// "10.141.75.115"