"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerConfig = {
    openapi: {
        info: {
            title: "Joke Service",
            description: "This is an API serving up jokes.",
            version: "0.1.0",
        },
        servers: [
            {
                url: "https://joke.mydomain.com",
            },
        ],
    },
    hideUntagged: true,
    exposeRoute: true,
};
exports.default = swaggerConfig;
//# sourceMappingURL=swaggerconfig.js.map