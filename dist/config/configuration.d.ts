declare const _default: (() => {
    env: {
        NODE_ENV: string | undefined;
        PORT: number;
        JWT_SECRET: string | undefined;
    };
    auth: {
        JWT_SECRET: string | undefined;
    };
    database: {
        DB_USER: string | undefined;
        DB_PASS: string | undefined;
        DB_PORT: number;
        DB_HOST: string | undefined;
        DB_NAME: string | undefined;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    env: {
        NODE_ENV: string | undefined;
        PORT: number;
        JWT_SECRET: string | undefined;
    };
    auth: {
        JWT_SECRET: string | undefined;
    };
    database: {
        DB_USER: string | undefined;
        DB_PASS: string | undefined;
        DB_PORT: number;
        DB_HOST: string | undefined;
        DB_NAME: string | undefined;
    };
}>;
export default _default;
