import { ForecastService } from './services/forecast.service';
export declare class ForecastController {
    private forecastService;
    constructor(forecastService: ForecastService);
    getForecast(res: any): Promise<any>;
    getTopReport(res: any, topCustomerNumber: any): Promise<any>;
}
