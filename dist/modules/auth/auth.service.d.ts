import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/common/enum/user_type.enum';
import { AdminService } from '../admin/admin.service';
import { VendorService } from '../vendor/vendor.service';
import { AdvertiserService } from '../advertiser/advertiser.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly adminService;
    private readonly vendorService;
    private readonly advertiserService;
    constructor(jwtService: JwtService, adminService: AdminService, vendorService: VendorService, advertiserService: AdvertiserService);
    validateUser(username: string, pass: string, user_type: UserType): Promise<any>;
    generateToken(user: any): Promise<{
        user: any;
        token: string;
    }>;
}
