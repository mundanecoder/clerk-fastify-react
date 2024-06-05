import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function sayHello(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {},
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      // const message: string = "it is working amazingly fine are you sure!";

      const userdata = req.user;

      return res.status(200).send({ data: userdata });
    }
  );
}
