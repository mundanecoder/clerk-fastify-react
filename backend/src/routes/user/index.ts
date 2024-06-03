import { FastifyPluginAsync } from "fastify";
import { sayHello } from "../../controllers/user/sayHello";

const User: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  sayHello(fastify);
};

export default User;
