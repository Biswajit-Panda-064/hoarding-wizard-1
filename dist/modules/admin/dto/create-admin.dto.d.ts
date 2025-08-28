import { UserType } from 'src/common/enum/user_type.enum';
export declare class CreateAdminDto {
    name: string;
    email: string;
    password: string;
    otp?: string;
    userType?: UserType;
}
