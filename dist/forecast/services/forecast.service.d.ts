import { Customer } from '../../customer/interfaces/customer.interface';
import { CustomerService } from '../../customer/customer.service';
import { WeatherForecast } from '../interfaces/weatherForecast.interface';
import { Forecast } from '../interfaces/forecast.interface';
import { OpenweatherService } from './openweather.service';
export declare class ForecastService {
    private customerService;
    private openweatherService;
    constructor(customerService: CustomerService, openweatherService: OpenweatherService);
    getForecast(): Promise<Forecast[]>;
    getTopReport(top: number): Promise<Forecast[]>;
    getForecastList(customers: Customer[]): Promise<Forecast[]>;
    getRainyDays(weatherForecast: WeatherForecast): string[];
}
