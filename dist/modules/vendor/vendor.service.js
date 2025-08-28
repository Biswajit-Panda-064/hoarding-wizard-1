"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const vendor_entity_1 = require("./vendor.entity");
const pagination_dto_1 = require("./dto/pagination.dto");
let VendorService = class VendorService {
    vendorRepository;
    constructor(vendorRepository) {
        this.vendorRepository = vendorRepository;
    }
    async findByEmail(email) {
        return this.vendorRepository.findOne({ where: { email } });
    }
    async create(createVendorDto) {
        const { email, password, ...rest } = createVendorDto;
        const existing = await this.findByEmail(email);
        if (existing) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const vendor = this.vendorRepository.create({
            ...rest,
            email,
            password: hashedPassword,
        });
        return this.vendorRepository.save(vendor);
    }
    async findById(id) {
        const vendor = await this.vendorRepository.findOne({ where: { id, isActive: true } });
        if (!vendor) {
            throw new common_1.NotFoundException(`Vendor with ID ${id} not found`);
        }
        return vendor;
    }
    async findAll(status = 'all', paginationDto = new pagination_dto_1.PaginationDto()) {
        let { page = 1, limit = 10 } = paginationDto;
        limit = Math.min(limit, pagination_dto_1.PaginationDto.MAX_LIMIT);
        const skip = (page - 1) * limit;
        let where = {};
        if (status === 'active') {
            where = { isActive: true };
        }
        else if (status === 'inactive') {
            where = { isActive: false };
        }
        const [counts, [data, filteredTotal]] = await Promise.all([
            Promise.all([
                this.vendorRepository.count(),
                this.vendorRepository.count({ where: { isActive: true } }),
                this.vendorRepository.count({ where: { isActive: false } })
            ]),
            this.vendorRepository.findAndCount({
                where,
                skip,
                take: limit,
                order: { createdAt: 'DESC' }
            })
        ]);
        const [total, active, inactive] = counts;
        const totalPages = Math.ceil(filteredTotal / limit);
        return {
            data,
            pagination: {
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            },
            aggregation: { total, active, inactive }
        };
    }
    async update(id, updateVendorDto) {
        const vendor = await this.findById(id);
        if (updateVendorDto.email && updateVendorDto.email !== vendor.email) {
            const existing = await this.vendorRepository.findOne({ where: { email: updateVendorDto.email } });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        if (updateVendorDto.password) {
            updateVendorDto.password = await bcrypt.hash(updateVendorDto.password, 10);
        }
        await this.vendorRepository.update(id, updateVendorDto);
        return this.findById(id);
    }
    async softDelete(id, userId) {
        const vendor = await this.findById(id);
        if (!vendor) {
            throw new common_1.NotFoundException(`Vendor with ID ${id} not found`);
        }
        if (!vendor.isActive) {
            throw new common_1.ConflictException('Vendor is already de-active');
        }
        vendor.isActive = false;
        vendor.updatedBy = userId;
        await this.vendorRepository.save(vendor);
        return vendor;
    }
    async toggleStatus(id, userId) {
        const vendor = await this.vendorRepository.findOne({
            where: { id }
        });
        if (!vendor) {
            throw new common_1.NotFoundException(`Vendor with ID ${id} not found`);
        }
        if (vendor.isActive) {
            throw new common_1.ConflictException('Vendor is already active');
        }
        vendor.isActive = true;
        vendor.updatedBy = userId;
        return this.vendorRepository.save(vendor);
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VendorService);
//# sourceMappingURL=vendor.service.js.map