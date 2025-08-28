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
exports.Screen = void 0;
const typeorm_1 = require("typeorm");
const vendor_entity_1 = require("../vendor/vendor.entity");
const city_entity_1 = require("../city/city.entity");
const place_category_entity_1 = require("../place_category/place_category.entity");
const place_entity_1 = require("../place/place.entity");
let Screen = class Screen {
    id;
    name;
    type;
    size;
    deviceId;
    slots;
    duration;
    image;
    vendorId;
    vendor;
    cityId;
    city;
    categoryId;
    category;
    placeId;
    place;
    isActive;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
};
exports.Screen = Screen;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Screen.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Screen.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Screen.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'size', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Screen.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id', type: 'varchar', unique: true, length: 200 }),
    __metadata("design:type", String)
], Screen.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slots', type: 'int', default: 6 }),
    __metadata("design:type", Number)
], Screen.prototype, "slots", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration', type: 'int', default: 10 }),
    __metadata("design:type", Number)
], Screen.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image', type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], Screen.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id', type: 'int' }),
    __metadata("design:type", Number)
], Screen.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    __metadata("design:type", vendor_entity_1.Vendor)
], Screen.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id', type: 'int' }),
    __metadata("design:type", Number)
], Screen.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'city_id' }),
    __metadata("design:type", city_entity_1.City)
], Screen.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', type: 'int' }),
    __metadata("design:type", Number)
], Screen.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => place_category_entity_1.PlaceCategory, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", place_category_entity_1.PlaceCategory)
], Screen.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'place_id', type: 'int' }),
    __metadata("design:type", Number)
], Screen.prototype, "placeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => place_entity_1.Place, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'place_id' }),
    __metadata("design:type", place_entity_1.Place)
], Screen.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Screen.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Screen.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Screen.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Screen.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Screen.prototype, "updatedAt", void 0);
exports.Screen = Screen = __decorate([
    (0, typeorm_1.Entity)('screens')
], Screen);
//# sourceMappingURL=screen.entity.js.map