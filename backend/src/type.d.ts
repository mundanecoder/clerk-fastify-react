import "@fastify/fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      // Add more properties as needed
    };
  }
}
