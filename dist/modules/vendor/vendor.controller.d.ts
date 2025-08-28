import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { PaginationDto } from './dto/pagination.dto';
import { S3BucketService } from 'src/modules/s3_bucket/s3_bucket.service';
export declare class VendorController {
    private readonly vendorService;
    private readonly s3Service;
    constructor(vendorService: VendorService, s3Service: S3BucketService);
    create(createVendorDto: CreateVendorDto, userId: number, file?: Express.MulterS3.File): Promise<any>;
    findOne(id: number): Promise<any>;
    findAll(status: "all" | "active" | "inactive" | undefined, paginationDto: PaginationDto): Promise<any>;
    update(id: number, updateVendorDto: UpdateVendorDto, userId: number, file?: Express.MulterS3.File): Promise<any>;
    activateVendor(id: number, userId: number): Promise<any>;
    softDelete(id: number, userId: number): Promise<any>;
}
