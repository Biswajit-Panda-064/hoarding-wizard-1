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
exports.Advertiser = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const user_type_enum_1 = require("../../common/enum/user_type.enum");
let Advertiser = class Advertiser {
    id;
    name;
    email;
    phoneNo;
    address;
    gstNo;
    otp;
    password;
    userType;
    logo;
    isActive;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
};
exports.Advertiser = Advertiser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Advertiser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Advertiser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 150, unique: true }),
    __metadata("design:type", String)
], Advertiser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_no', type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], Advertiser.prototype, "phoneNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Advertiser.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gst_no', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Advertiser.prototype, "gstNo", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'otp', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Advertiser.prototype, "otp", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], Advertiser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_type',
        type: 'enum',
        enum: user_type_enum_1.UserType,
        default: user_type_enum_1.UserType.VENDOR,
    }),
    __metadata("design:type", String)
], Advertiser.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo', type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], Advertiser.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Advertiser.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Advertiser.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Advertiser.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Advertiser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Advertiser.prototype, "updatedAt", void 0);
exports.Advertiser = Advertiser = __decorate([
    (0, typeorm_1.Entity)('advertisers')
], Advertiser);
//# sourceMappingURL=advertiser.entity.js.map