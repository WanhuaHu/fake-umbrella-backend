import { Customer } from '../../customer/interfaces/customer.interface';
import { WeatherForecast } from '../interfaces/weatherForecast.interface';
import { Forecast } from '../interfaces/forecast.interface';
import { CustomerService } from '../../customer/customer.service';
import { OpenweatherService } from './openweather.service';
import { RedisCacheService } from '../../redis-cache/redis-cache.service';
export declare class ForecastService {
    private customerService;
    private weatherCacheService;
    private openweatherService;
    constructor(customerService: CustomerService, weatherCacheService: RedisCacheService, openweatherService: OpenweatherService);
    getForecast(): Promise<Forecast[]>;
    getTopReport(top: number): Promise<Forecast[]>;
    getForecastList(customers: Customer[]): Promise<Forecast[]>;
    getRainyDays(weatherForecast: WeatherForecast): string[];
}
