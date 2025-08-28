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
exports.Content = void 0;
const typeorm_1 = require("typeorm");
const advertiser_entity_1 = require("../advertiser/advertiser.entity");
let Content = class Content {
    id;
    advertiserId;
    advertiser;
    title;
    type;
    description;
    status;
    remark;
    url;
    isActive;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
};
exports.Content = Content;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'int' }),
    __metadata("design:type", Number)
], Content.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'advertiser_id', type: 'int' }),
    __metadata("design:type", Number)
], Content.prototype, "advertiserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => advertiser_entity_1.Advertiser, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'advertiser_id' }),
    __metadata("design:type", advertiser_entity_1.Advertiser)
], Content.prototype, "advertiser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Content.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'enum', enum: ['image', 'video'] }),
    __metadata("design:type", String)
], Content.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Content.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'enum', enum: ['pending', 'approved', 'rejected'], default: 'pending' }),
    __metadata("design:type", String)
], Content.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remark', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Content.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], Content.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Content.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Content.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Content.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Content.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Content.prototype, "updatedAt", void 0);
exports.Content = Content = __decorate([
    (0, typeorm_1.Entity)('contents')
], Content);
//# sourceMappingURL=content.entity.js.map