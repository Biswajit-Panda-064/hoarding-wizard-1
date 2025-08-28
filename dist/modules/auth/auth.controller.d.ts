import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AdvertiserService } from '../advertiser/advertiser.service';
import { CreateAdvertiserDto } from '../advertiser/dto/create-advertiser.dto';
import { S3BucketService } from '../s3_bucket/s3_bucket.service';
export declare class AuthController {
    private authService;
    private advertiserService;
    private s3Service;
    constructor(authService: AuthService, advertiserService: AdvertiserService, s3Service: S3BucketService);
    login(body: LoginDto): Promise<any>;
    registerAdvertiser(createAdvertiserDto: CreateAdvertiserDto, file?: Express.MulterS3.File): Promise<any>;
}
