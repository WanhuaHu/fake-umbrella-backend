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
const common_1 = require("@nestjs/common");
const forecast_service_1 = require("./services/forecast.service");
let ForecastController = class ForecastController {
    constructor(forecastService) {
        this.forecastService = forecastService;
    }
    async getForecast(res) {
        const forecast = await this.forecastService.getForecast();
        return res.status(common_1.HttpStatus.OK).json(forecast);
    }
    async getTopReport(res, top) {
        const topReport = await this.forecastService.getTopReport(top);
        return res.status(common_1.HttpStatus.OK).json(topReport);
    }
};
__decorate([
    common_1.Get('forecast'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ForecastController.prototype, "getForecast", null);
__decorate([
    common_1.Get('report'),
    __param(0, common_1.Res()), __param(1, common_1.Query('top')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ForecastController.prototype, "getTopReport", null);
ForecastController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [forecast_service_1.ForecastService])
], ForecastController);
exports.ForecastController = ForecastController;
//# sourceMappingURL=forecast.controller.js.map