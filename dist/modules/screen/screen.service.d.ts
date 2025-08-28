import { Repository } from 'typeorm';
import { Screen } from './screen.entity';
export declare class ScreenService {
    private readonly screenRepository;
    private readonly DEFAULT_LIMIT;
    constructor(screenRepository: Repository<Screen>);
    create(data: Partial<Screen>): Promise<Screen>;
    findAll(page?: number, filters?: any): Promise<{
        data: Screen[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    private getActiveScreen;
    findById(id: number): Promise<Screen>;
    update(id: number, data: Partial<Screen>): Promise<Screen>;
    softDelete(id: number): Promise<Screen>;
    toggleActive(id: number): Promise<Screen>;
}
