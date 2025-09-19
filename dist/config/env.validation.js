"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Test"] = "test";
})(Environment || (Environment = {}));
class EnvironmentVariables {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(Environment),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(65535),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "PORT", void 0);
class AuthVariables {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthVariables.prototype, "JWT_SECRET", void 0);
class DatabaseVariables {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DatabaseVariables.prototype, "DB_USER", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DatabaseVariables.prototype, "DB_PASS", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(65535),
    __metadata("design:type", Number)
], DatabaseVariables.prototype, "DB_PORT", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsFQDN)(),
    __metadata("design:type", String)
], DatabaseVariables.prototype, "DB_HOST", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DatabaseVariables.prototype, "DB_NAME", void 0);
class ConfigVariables {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => EnvironmentVariables),
    __metadata("design:type", EnvironmentVariables)
], ConfigVariables.prototype, "environment", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AuthVariables),
    __metadata("design:type", AuthVariables)
], ConfigVariables.prototype, "auth", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DatabaseVariables),
    __metadata("design:type", DatabaseVariables)
], ConfigVariables.prototype, "database", void 0);
function validate(config) {
    const groupedConfig = {
        environment: {
            NODE_ENV: config.NODE_ENV,
            PORT: config.PORT,
        },
        auth: {
            JWT_SECRET: config.JWT_SECRET,
        },
        database: {
            DB_USER: config.DB_USER,
            DB_PASS: config.DB_PASS,
            DB_PORT: config.DB_PORT,
            DB_HOST: config.DB_HOST,
            DB_NAME: config.DB_NAME,
        },
    };
    const validatedConfig = (0, class_transformer_1.plainToInstance)(ConfigVariables, groupedConfig, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
        whitelist: true,
    });
    if (errors.length > 0) {
        throw new Error(JSON.stringify(errors.map((error) => error.children?.map((e) => e.constraints)), null, 2));
    }
    return validatedConfig;
}
//# sourceMappingURL=env.validation.js.map