import { WeatherForecast } from '../interfaces/weatherForecast.interface';
import { ConfigService } from '@nestjs/config';
export declare class OpenweatherService {
    private configService;
    constructor(configService: ConfigService);
    WEATHER_API_KEY: string;
    WEATHER_API_URL: string;
    getWeatherForecastByCityNameAndCountryCode(cityName: string, countryCode: string): Promise<WeatherForecast>;
    getWeatherForecastByZipCode(zipCode: string): Promise<WeatherForecast>;
    getWeatherForecastByCityName(cityName: string): Promise<WeatherForecast>;
}
