import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createClerkClient, getAuth } from "@clerk/fastify";

const clerkOptions = {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
};

const clerkClient = createClerkClient(clerkOptions);

const authPlugin = function (fastify: FastifyInstance) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { userId } = getAuth(request);

      if (!userId) {
        return reply.code(401).send({ error: "Unauthorized: Missing user ID" });
      }

      const user = await clerkClient.users.getUser(userId);

      if (!user) {
        return reply.code(401).send({ error: "Unauthorized: User not found" });
      }

      request.user = {
        ...user,
        nameOwner: "Dipankar",
      };

      // Remove the 'done()' function call
    } catch (error) {
      return reply.code(401).send({ error: "Unauthorized: Invalid token" });
    }
  };
};

export default authPlugin;
