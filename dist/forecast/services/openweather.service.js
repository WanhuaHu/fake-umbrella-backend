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
exports.OpenweatherService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const WEATHER_API_KEY = '4a511633e9c55ee9ed5e7bc0d598f48f';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
let OpenweatherService = class OpenweatherService {
    constructor(http) {
        this.http = http;
    }
    async getWeatherForecastByCityNameAndCountryCode(cityName, countryCode) {
        try {
            const result = axios_1.default.get(`${WEATHER_API_URL}/forecast?q=${cityName},${countryCode}&appid=${WEATHER_API_KEY}`);
            return result.then((result) => result.data);
        }
        catch (error) {
            console.log(error.message);
            return error.response.data;
        }
    }
    async getWeatherForecastByZipCode(zipCode) {
        const countryCode = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(zipCode) ? 'ca' : 'us';
        try {
            const result = axios_1.default.get(`${WEATHER_API_URL}/forecast?zip=${zipCode},${countryCode}&appid=${WEATHER_API_KEY}`);
            return result.then((result) => result.data);
        }
        catch (error) {
            console.log(error.message);
            return error.response.data;
        }
    }
    async getWeatherForecastByCityName(cityName) {
        try {
            const result = axios_1.default.get(`${WEATHER_API_URL}/forecast?q=${cityName}&appid=${WEATHER_API_KEY}`);
            return result.then((result) => result.data);
        }
        catch (error) {
            console.log(error.message);
        }
    }
};
OpenweatherService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], OpenweatherService);
exports.OpenweatherService = OpenweatherService;
//# sourceMappingURL=openweather.service.js.map