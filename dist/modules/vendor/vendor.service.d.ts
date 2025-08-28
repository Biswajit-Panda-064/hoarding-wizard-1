import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class VendorService {
    private readonly vendorRepository;
    constructor(vendorRepository: Repository<Vendor>);
    findByEmail(email: string): Promise<Vendor | null>;
    create(createVendorDto: CreateVendorDto): Promise<Vendor>;
    findById(id: number): Promise<Vendor>;
    findAll(status?: 'all' | 'active' | 'inactive', paginationDto?: PaginationDto): Promise<{
        data: Vendor[];
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
    update(id: number, updateVendorDto: UpdateVendorDto): Promise<Vendor>;
    softDelete(id: number, userId: number): Promise<any>;
    toggleStatus(id: number, userId: number): Promise<Vendor>;
}
