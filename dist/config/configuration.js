"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const env_validation_1 = require("./env.validation");
exports.default = (0, config_1.registerAs)('config', () => {
    const config = {
        env: {
            NODE_ENV: process.env.NODE_ENV,
            PORT: Number(process.env.PORT),
            JWT_SECRET: process.env.JWT_SECRET,
        },
        auth: {
            JWT_SECRET: process.env.JWT_SECRET,
        },
        database: {
            DB_USER: process.env.DB_USER,
            DB_PASS: process.env.DB_PASS,
            DB_PORT: Number(process.env.DB_PORT),
            DB_HOST: process.env.DB_HOST,
            DB_NAME: process.env.DB_NAME,
        },
    };
    (0, env_validation_1.validate)({
        ...config.env,
        ...config.auth,
        ...config.database,
    });
    return config;
});
//# sourceMappingURL=configuration.js.map