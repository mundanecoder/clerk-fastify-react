import { FastifyPluginAsync } from "fastify";
import { verifyToken, VerifyTokenOptions } from "@clerk/backend";

const authPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("preHandler", async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        return reply.code(401).send({ error: "Unauthorized: Missing token" });
      }

      const options: VerifyTokenOptions = {
        secretKey: process.env.CLERK_SECRET_KEY,
        // Include any necessary options for your token verification
      };

      const decodedToken = await verifyToken(token, options);

      // Assuming the decodedToken contains userId
      // request.user = { userId };
    } catch (error) {
      return reply.code(401).send({ error: "Unauthorized: Invalid token" });
    }
  });
};

export default authPlugin;
