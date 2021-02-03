"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const swStats = require("swagger-stats");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(swStats.getMiddleware());
    const APP_NAME = process.env.npm_package_name;
    const APP_VERSION = process.env.npm_package_version;
    const options = new swagger_1.DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(`The ${APP_NAME} description`)
        .setVersion(APP_VERSION)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map