import { Repository } from 'typeorm';
import { Advertiser } from './advertiser.entity';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class AdvertiserService {
    private readonly advertiserRepository;
    constructor(advertiserRepository: Repository<Advertiser>);
    findByEmail(email: string): Promise<Advertiser | null>;
    create(createAdvertiserDto: CreateAdvertiserDto): Promise<Advertiser>;
    findById(id: number): Promise<Advertiser>;
    update(id: number, updateAdvertiserDto: UpdateAdvertiserDto): Promise<Advertiser>;
    softDelete(id: number, userId: number): Promise<any>;
    toggleStatus(id: number, userId: number): Promise<Advertiser>;
    findAll(status?: 'all' | 'active' | 'inactive', paginationDto?: PaginationDto): Promise<{
        data: Advertiser[];
        pagination: {
            page: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
        aggregation: {
            total: number;
            active: number;
            inactive: number;
        };
    }>;
}
