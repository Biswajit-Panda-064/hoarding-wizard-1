"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const typeorm_1 = require("typeorm");
const user_type_enum_1 = require("../../common/enum/user_type.enum");
const class_transformer_1 = require("class-transformer");
let Vendor = class Vendor {
    id;
    name;
    email;
    phoneNo;
    address;
    gstNo;
    panNo;
    accountName;
    accountNo;
    ifscCode;
    otp;
    password;
    logo;
    userType;
    isActive;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
};
exports.Vendor = Vendor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Vendor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Vendor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 150, unique: true }),
    __metadata("design:type", String)
], Vendor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_no', type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], Vendor.prototype, "phoneNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Vendor.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gst_no', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "gstNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pan_no', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "panNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ac_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Vendor.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ac_no', type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], Vendor.prototype, "accountNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ifsc_code', type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], Vendor.prototype, "ifscCode", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'otp', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "otp", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], Vendor.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo', type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_type',
        type: 'enum',
        enum: user_type_enum_1.UserType,
        default: user_type_enum_1.UserType.VENDOR,
    }),
    __metadata("design:type", String)
], Vendor.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Vendor.prototype, "isActive", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Vendor.prototype, "createdBy", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Vendor.prototype, "updatedBy", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Vendor.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Vendor.prototype, "updatedAt", void 0);
exports.Vendor = Vendor = __decorate([
    (0, typeorm_1.Entity)('vendors')
], Vendor);
//# sourceMappingURL=vendor.entity.js.map