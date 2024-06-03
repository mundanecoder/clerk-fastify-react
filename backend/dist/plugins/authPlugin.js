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
const backend_1 = require("@clerk/backend");
const authPlugin = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.addHook("preHandler", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token) {
                return reply.code(401).send({ error: "Unauthorized: Missing token" });
            }
            const options = {
                secretKey: process.env.CLERK_SECRET_KEY,
                // Include any necessary options for your token verification
            };
            const decodedToken = yield (0, backend_1.verifyToken)(token, options);
            // Assuming the decodedToken contains userId
            // request.user = { userId };
        }
        catch (error) {
            return reply.code(401).send({ error: "Unauthorized: Invalid token" });
        }
    }));
});
exports.default = authPlugin;
//# sourceMappingURL=authPlugin.js.map