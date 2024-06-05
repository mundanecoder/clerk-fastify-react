"use strict";
// import "../loadEnv";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("@clerk/fastify");
const clerkOptions = {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
};
console.log(clerkOptions);
const protectedRoutes = (instance, opts, done) => {
    instance.register(fastify_1.clerkPlugin, clerkOptions);
    const clerkClient = (0, fastify_1.createClerkClient)(clerkOptions);
    instance.get("/private", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const { userId } = getAuth(request);
            // const user = userId ? await clerkClient.users.getUser(userId) : null;
            // console.log(user);
            // return { user };
            return { message: "hello" };
        }
        catch (error) {
            return reply.code(500).send({ error: "Failed to fetch user data" });
        }
    }));
    done();
};
exports.default = protectedRoutes;
//# sourceMappingURL=PrivateRoutes.js.map