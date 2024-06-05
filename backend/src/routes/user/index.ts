import { FastifyPluginAsync } from "fastify";
import { sayHello } from "../../controllers/user/sayHello";
import authMiddleware from "../../fastify-hooks/AuthHook";

const User: FastifyPluginAsync = async function (fastify, opts) {
  fastify.addHook("preHandler", authMiddleware(fastify));
  sayHello(fastify);
};

export default User;
