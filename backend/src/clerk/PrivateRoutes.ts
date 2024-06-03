import { FastifyPluginCallback } from "fastify";
import { clerkClient, clerkPlugin, getAuth, verifyToken } from "@clerk/fastify";

const protectedRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.register(clerkPlugin, {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  });

  instance.get("/private", async (request, reply) => {
    const token = request.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return reply.code(401).send({ error: "Unauthorized: Missing token" });
    }
    try {
      console.log(token[8], "check !");
      const { getToken } = getAuth(request);

      const response = await getToken();
      // console.log("Extracted userId:", userId);

      // if (!userId) {
      //   return reply.code(401).send({ error: "Unauthorized: Invalid token" });
      // }
      console.log(response, "check 2");
    } catch (error) {
      return reply.code(500).send({ error: "Failed to fetch user data" });
    }
  });

  done();
};

export default protectedRoutes;
