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
const protectedRoutes = (instance, opts, done) => {
    instance.register(fastify_1.clerkPlugin, {
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
        secretKey: process.env.CLERK_SECRET_KEY,
    });
    instance.get("/private", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            return reply.code(401).send({ error: "Unauthorized: Missing token" });
        }
        try {
            console.log(token[8], "check !");
            const { getToken } = (0, fastify_1.getAuth)(request);
            const response = yield getToken();
            // console.log("Extracted userId:", userId);
            // if (!userId) {
            //   return reply.code(401).send({ error: "Unauthorized: Invalid token" });
            // }
            console.log(response, "check 2");
        }
        catch (error) {
            return reply.code(500).send({ error: "Failed to fetch user data" });
        }
    }));
    done();
};
exports.default = protectedRoutes;
//# sourceMappingURL=PrivateRoutes.js.map