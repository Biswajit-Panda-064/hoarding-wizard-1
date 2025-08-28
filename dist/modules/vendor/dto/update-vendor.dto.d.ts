import { CreateVendorDto } from './create-vendor.dto';
declare const UpdateVendorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVendorDto>>;
export declare class UpdateVendorDto extends UpdateVendorDto_base {
    createdBy?: number;
    updatedBy?: number;
}
export {};
