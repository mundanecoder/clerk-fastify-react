import "@fastify/fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      userId: string;
    };
  }
}
