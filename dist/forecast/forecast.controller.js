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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const forecast_service_1 = require("./services/forecast.service");
let ForecastController = class ForecastController {
    constructor(forecastService) {
        this.forecastService = forecastService;
    }
    async getForecast(res) {
        try {
            const forecast = await this.forecastService.getForecast();
            return res.status(common_1.HttpStatus.OK).json(forecast);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }
    async getTopReport(res, topCustomerNumber) {
        try {
            const topReport = await this.forecastService.getTopReport(topCustomerNumber);
            return res.status(common_1.HttpStatus.OK).json(topReport);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
        }
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'Retrieve a list of customers that will have rain for the next 5 days with the name, contact and phone number and for when the rain is expected.' }),
    swagger_1.ApiOkResponse({ description: 'Retrieved forecast data successfully' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    common_1.Get('forecast'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ForecastController.prototype, "getForecast", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Retrieve rain forecast report for the next 5 days for given top customers.' }),
    swagger_1.ApiParam({ name: 'topCustomerNumber', required: true, description: 'The top number of companies with most employees' }),
    swagger_1.ApiOkResponse({ description: 'Retrieved forecast data successfully' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    common_1.Get('report'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()), __param(1, common_1.Query('top')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ForecastController.prototype, "getTopReport", null);
ForecastController = __decorate([
    swagger_1.ApiTags('forecast'),
    common_1.Controller(),
    __metadata("design:paramtypes", [forecast_service_1.ForecastService])
], ForecastController);
exports.ForecastController = ForecastController;
//# sourceMappingURL=forecast.controller.js.map