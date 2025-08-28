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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const content_entity_1 = require("./content.entity");
let ContentService = class ContentService {
    contentRepository;
    constructor(contentRepository) {
        this.contentRepository = contentRepository;
    }
    async create(data) {
        const existing = await this.contentRepository.findOne({ where: { title: data.title, advertiserId: data.advertiserId } });
        if (existing) {
            throw new common_1.ConflictException('Content title already exists for this advertiser');
        }
        const content = this.contentRepository.create(data);
        const result = await this.contentRepository.save(content);
        return result;
    }
    async findAll(page = 1, limit = 10) {
        const [data, total] = await this.contentRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'DESC' },
        });
        return data;
    }
    async findById(id) {
        const content = await this.contentRepository.findOne({ where: { id, isActive: true } });
        if (!content)
            throw new common_1.NotFoundException('Content not found');
        return content;
    }
    async update(id, data) {
        const content = await this.contentRepository.findOne({ where: { id, isActive: true } });
        if (!content)
            throw new common_1.NotFoundException('Content not found');
        if (data.title && data.title !== content.title) {
            const existing = await this.contentRepository.findOne({ where: { title: data.title, advertiserId: content.advertiserId } });
            if (existing) {
                throw new common_1.ConflictException('Content title already exists for this advertiser');
            }
        }
        Object.assign(content, data);
        const result = await this.contentRepository.save(content);
        return result;
    }
    async softDelete(id) {
        const content = await this.contentRepository.findOne({ where: { id, isActive: true } });
        if (!content)
            throw new common_1.NotFoundException('Content not found');
        content.isActive = false;
        await this.contentRepository.save(content);
        return content;
    }
    async hardDelete(id) {
        const content = await this.contentRepository.findOne({ where: { id } });
        if (!content)
            throw new common_1.NotFoundException('Content not found');
        await this.contentRepository.remove(content);
        return true;
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(content_entity_1.Content)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContentService);
//# sourceMappingURL=content.service.js.map