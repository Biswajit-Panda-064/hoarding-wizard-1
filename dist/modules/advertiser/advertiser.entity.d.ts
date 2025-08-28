import { UserType } from 'src/common/enum/user_type.enum';
export declare class Advertiser {
    id: number;
    name: string;
    email: string;
    phoneNo: string;
    address: string;
    gstNo?: string;
    otp?: string;
    password: string;
    userType: UserType;
    logo: string;
    isActive: boolean;
    createdBy?: number;
    updatedBy?: number;
    createdAt: Date;
    updatedAt: Date;
}
