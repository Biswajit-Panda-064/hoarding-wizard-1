import { AdvertiserService } from './advertiser.service';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';
import { PaginationDto } from './dto/pagination.dto';
import { S3BucketService } from '../s3_bucket/s3_bucket.service';
export declare class AdvertiserController {
    private readonly advertiserService;
    private readonly s3Service;
    constructor(advertiserService: AdvertiserService, s3Service: S3BucketService);
    findAll(status: "all" | "active" | "inactive" | undefined, paginationDto: PaginationDto): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateAdvertiserDto: UpdateAdvertiserDto, userId: number, file?: Express.MulterS3.File): Promise<any>;
    activateAdvertiser(id: number, userId: number): Promise<any>;
    softDelete(id: number, userId: number): Promise<any>;
}
