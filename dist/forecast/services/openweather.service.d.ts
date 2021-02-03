import { HttpService } from '@nestjs/common';
import { WeatherForecast } from '../interfaces/weatherForecast.interface';
export declare class OpenweatherService {
    private http;
    constructor(http: HttpService);
    getWeatherForecastByCityNameAndCountryCode(cityName: string, countryCode: string): Promise<WeatherForecast>;
    getWeatherForecastByZipCode(zipCode: string): Promise<WeatherForecast>;
    getWeatherForecastByCityName(cityName: string): Promise<WeatherForecast>;
}
