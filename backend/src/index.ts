import Fastify from "fastify";
import connectToDb from "./database/db";
import autoLoad from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import { join } from "path";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import Swagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";
import chemaConfig from "./swaggerconfig";
import * as dotenv from "dotenv";
import swaggerConfig from "./swaggerconfig";

dotenv.config();
const clerkOptions = {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
};

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

const environment: string = "development";
const schemaConfig = {
  schema: {
    description: "This returns jokes",
    tags: ["JOKE"],
    summary: "This returns a different joke every time this is called",
    operationId: "get-joke",
    response: {
      200: {
        description: "Successful Response",
        type: "object",
        properties: {
          joke: { type: "string" },
        },
      },
    },
  },
};

const fastify = Fastify({
  logger: envToLogger[environment as keyof typeof envToLogger] ?? true,
});

fastify.register(clerkPlugin, clerkOptions);
fastify.register(Swagger, swaggerConfig);
fastify.register(SwaggerUI);

fastify.register(fastifyCors, {
  allowedHeaders: "*",
  methods: "*",
});

fastify.register(autoLoad, {
  dir: join(__dirname, "./routes"),
});

// fastify.register(autoLoad, {
//   dir: join(__dirname, './plugins'),
// });

connectToDb();

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
