import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: Type.Object({
            hello: Type.String(),
          }),
        },
      },
    },
    async () => {
      return {
        hello: "world you fine",
      };
    }
  );
};
export default plugin;
