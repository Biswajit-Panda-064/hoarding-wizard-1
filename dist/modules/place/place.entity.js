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
exports.Place = void 0;
const typeorm_1 = require("typeorm");
const vendor_entity_1 = require("../vendor/vendor.entity");
const city_entity_1 = require("../city/city.entity");
const place_category_entity_1 = require("../place_category/place_category.entity");
let Place = class Place {
    id;
    name;
    location;
    placeCoordinates;
    contactPerson;
    contactNo;
    noScreens;
    dailyFootfall;
    vendor;
    vendorId;
    city;
    cityId;
    category;
    categoryId;
    isActive;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
    image;
};
exports.Place = Place;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Place.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Place.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'location', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'place_coordinates', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "placeCoordinates", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_person', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "contactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_no', type: 'varchar', length: 15, nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "contactNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'no_screens', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Place.prototype, "noScreens", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'daily_footfall', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Place.prototype, "dailyFootfall", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    __metadata("design:type", vendor_entity_1.Vendor)
], Place.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id', type: 'int' }),
    __metadata("design:type", Number)
], Place.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'city_id' }),
    __metadata("design:type", city_entity_1.City)
], Place.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id', type: 'int' }),
    __metadata("design:type", Number)
], Place.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => place_category_entity_1.PlaceCategory, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", place_category_entity_1.PlaceCategory)
], Place.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', type: 'int' }),
    __metadata("design:type", Number)
], Place.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Place.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Place.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Place.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Place.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Place.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image', type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], Place.prototype, "image", void 0);
exports.Place = Place = __decorate([
    (0, typeorm_1.Entity)('places')
], Place);
//# sourceMappingURL=place.entity.js.map