"use strict";
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
const clerkClient = (0, fastify_1.createClerkClient)(clerkOptions);
const authPlugin = function (fastify) {
    return (request, reply) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = (0, fastify_1.getAuth)(request);
            if (!userId) {
                return reply.code(401).send({ error: "Unauthorized: Missing user ID" });
            }
            const user = yield clerkClient.users.getUser(userId);
            if (!user) {
                return reply.code(401).send({ error: "Unauthorized: User not found" });
            }
            request.user = Object.assign(Object.assign({}, user), { nameOwner: "Dipankar" });
            // Remove the 'done()' function call
        }
        catch (error) {
            return reply.code(401).send({ error: "Unauthorized: Invalid token" });
        }
    });
};
exports.default = authPlugin;
//# sourceMappingURL=authPlugin.js.map