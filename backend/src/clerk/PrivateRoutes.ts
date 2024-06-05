// import "../loadEnv";

import { FastifyPluginCallback } from "fastify";
import { createClerkClient, clerkPlugin, getAuth } from "@clerk/fastify";

const clerkOptions = {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
};

console.log(clerkOptions);

const protectedRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.register(clerkPlugin, clerkOptions);
  const clerkClient = createClerkClient(clerkOptions);

  instance.get("/private", async (request, reply) => {
    try {
      // const { userId } = getAuth(request);

      // const user = userId ? await clerkClient.users.getUser(userId) : null;

      // console.log(user);

      // return { user };

      return { message: "hello" };
    } catch (error) {
      return reply.code(500).send({ error: "Failed to fetch user data" });
    }
  });

  done();
};

export default protectedRoutes;
