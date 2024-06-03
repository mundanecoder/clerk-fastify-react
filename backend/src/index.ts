import Fastify from "fastify";
import connectToDb from "./database/db";
import autoLoad from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import { join } from "path";
import { clerkClient, clerkPlugin, getAuth, verifyToken } from "@clerk/fastify";
import * as dotenv from "dotenv";

dotenv.config();

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const environment: string = "development"; // Replace "development" with the actual environment value

const fastify = Fastify({
  logger: envToLogger[environment as keyof typeof envToLogger] ?? true,
});

fastify.register(fastifyCors, {
  allowedHeaders: "*",
  methods: "*",
});

fastify.register(autoLoad, {
  dir: join(__dirname, "./routes"),
});

const clerkOptions = {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
};
fastify.register(clerkPlugin, clerkOptions);

connectToDb();

fastify.get("/private", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  // console.log(req.headers.authorization);

  if (!token)
    return res.status(401).send({
      message: "unauthorized",
    });
  try {
    const verifiedToken = await verifyToken(token, {
      apiUrl: "https://api.clerk.com",
      secretKey: process.env.CLERK_SECRET_KEY,
      jwtKey: process.env.CLERK_PEM_PUBLIC_KEY,
      audience: process.env.CLERK_PUBLISHABLE_KEY,
    });
    return { verifiedToken: verifiedToken };
  } catch (error) {
    console.log("error", error);
  }
});

fastify.get("/ping", async (request, reply) => {
  return reply.send({ message: "ping" });
});

const startServer = async () => {
  try {
    await fastify.ready();
    await fastify.listen({ port: 8000 });

    console.log("Server listening on port 8000");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startServer();
