import { CreateAdvertiserDto } from './create-advertiser.dto';
declare const UpdateAdvertiserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAdvertiserDto>>;
export declare class UpdateAdvertiserDto extends UpdateAdvertiserDto_base {
    createdBy?: number;
    updatedBy?: number;
    isActive?: boolean;
}
export {};
