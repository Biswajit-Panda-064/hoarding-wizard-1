import { Repository } from 'typeorm';
import { City } from './city.entity';
export declare class CityService {
    private readonly cityRepository;
    constructor(cityRepository: Repository<City>);
    createCity(cityName: string, createdBy?: number): Promise<City>;
    getAllCities(): Promise<City[]>;
    getCityById(id: number): Promise<City>;
    updateCity(id: number, cityName: string, updatedBy: number): Promise<City>;
    deleteCity(id: number, updatedBy?: number): Promise<City>;
}
