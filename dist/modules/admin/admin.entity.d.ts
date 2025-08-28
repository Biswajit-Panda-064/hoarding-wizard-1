import { UserType } from 'src/common/enum/user_type.enum';
export declare class Admin {
    id: number;
    name: string;
    email: string;
    otp?: string;
    password: string;
    userType: UserType;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}
