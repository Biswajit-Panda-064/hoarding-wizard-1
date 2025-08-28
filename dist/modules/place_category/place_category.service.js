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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const place_category_entity_1 = require("./place_category.entity");
let PlaceCategoryService = class PlaceCategoryService {
    placeCategoryRepository;
    constructor(placeCategoryRepository) {
        this.placeCategoryRepository = placeCategoryRepository;
    }
    async create(data) {
        const existing = await this.placeCategoryRepository.findOne({ where: { name: data.name } });
        if (existing) {
            throw new common_1.ConflictException('Place category name already exists');
        }
        const category = this.placeCategoryRepository.create(data);
        return this.placeCategoryRepository.save(category);
    }
    async findAll() {
        return this.placeCategoryRepository.find({ where: { isActive: true } });
    }
    async findOne(id) {
        const category = await this.placeCategoryRepository.findOne({ where: { id, isActive: true } });
        if (!category)
            throw new common_1.NotFoundException('Place category not found');
        return category;
    }
    async update(id, data) {
        const category = await this.findOne(id);
        Object.assign(category, data);
        return this.placeCategoryRepository.save(category);
    }
    async softDelete(id) {
        const category = await this.findOne(id);
        category.isActive = false;
        await this.placeCategoryRepository.save(category);
        return category;
    }
};
exports.PlaceCategoryService = PlaceCategoryService;
exports.PlaceCategoryService = PlaceCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(place_category_entity_1.PlaceCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlaceCategoryService);
//# sourceMappingURL=place_category.service.js.map