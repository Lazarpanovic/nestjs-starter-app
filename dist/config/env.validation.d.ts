declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
}
declare class AuthVariables {
    JWT_SECRET: string;
}
declare class DatabaseVariables {
    DB_USER: string;
    DB_PASS: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_NAME: string;
}
declare class ConfigVariables {
    environment: EnvironmentVariables;
    auth: AuthVariables;
    database: DatabaseVariables;
}
export declare function validate(config: Record<string, unknown>): ConfigVariables;
export {};
