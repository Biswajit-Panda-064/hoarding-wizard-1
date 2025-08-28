import { UserType } from 'src/common/enum/user_type.enum';
export declare class Vendor {
    id: number;
    name: string;
    email: string;
    phoneNo: string;
    address: string;
    gstNo?: string;
    panNo?: string;
    accountName: string;
    accountNo: string;
    ifscCode: string;
    otp?: string;
    password: string;
    logo: string;
    userType: UserType;
    isActive: boolean;
    createdBy?: number;
    updatedBy?: number;
    createdAt: Date;
    updatedAt: Date;
}
