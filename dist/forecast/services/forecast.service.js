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
exports.ForecastService = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("../../customer/customer.service");
const openweather_service_1 = require("./openweather.service");
const redis_cache_service_1 = require("../../redis-cache/redis-cache.service");
let ForecastService = class ForecastService {
    constructor(customerService, weatherCacheService, openweatherService) {
        this.customerService = customerService;
        this.weatherCacheService = weatherCacheService;
        this.openweatherService = openweatherService;
    }
    async getForecast() {
        common_1.Logger.log(`retrieve weather forecast`);
        const customers = await this.customerService.getAllCustomer();
        return this.getForecastList(customers);
    }
    async getTopReport(top) {
        common_1.Logger.log(`retrieve Top ${top} customers weather report`);
        const customers = await this.customerService.getCustomersSortByEmployeesNumber();
        return this.getForecastList(customers);
    }
    async getForecastList(customers) {
        const forecastList = [];
        for (const customer of customers) {
            const locationArray = customer.location.split(',');
            const cityName = locationArray[0];
            const countryCode = locationArray[1];
            common_1.Logger.log(`try to retrieve weather cache for ${cityName}:${countryCode}`);
            let weatherForecast = await this.weatherCacheService.get(`${cityName}:${countryCode}`);
            if (!weatherForecast) {
                common_1.Logger.log('weather cache not found, retrieve from external api');
                weatherForecast = await this.openweatherService.getWeatherForecastByCityNameAndCountryCode(cityName, countryCode);
                common_1.Logger.log('weather retrieved from external api, saving to cache');
                this.weatherCacheService.set(`${cityName}:${countryCode}`, weatherForecast);
            }
            else {
                common_1.Logger.log(`weather cache found ${cityName}:${countryCode}`);
            }
            const rainyDays = this.getRainyDays(weatherForecast);
            const forecast = {
                name: customer.name,
                personOfContact: customer.personOfContact,
                telephoneNumber: customer.telephoneNumber,
                location: customer.location,
                numberOfEmployees: customer.numberOfEmployees,
                rainDates: rainyDays,
                rainInFiveDays: rainyDays.length > 0 ? true : false,
            };
            forecastList.push(forecast);
        }
        return forecastList;
    }
    getRainyDays(weatherForecast) {
        const rainyDays = [];
        for (const list of weatherForecast.list) {
            for (const weather of list.weather) {
                if (weather.main === 'Rain') {
                    rainyDays.push(list.dt_txt);
                }
            }
        }
        return rainyDays;
    }
};
ForecastService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService,
        redis_cache_service_1.RedisCacheService,
        openweather_service_1.OpenweatherService])
], ForecastService);
exports.ForecastService = ForecastService;
//# sourceMappingURL=forecast.service.js.map