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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_type_enum_1 = require("../../common/enum/user_type.enum");
const admin_service_1 = require("../admin/admin.service");
const vendor_service_1 = require("../vendor/vendor.service");
const advertiser_service_1 = require("../advertiser/advertiser.service");
let AuthService = class AuthService {
    jwtService;
    adminService;
    vendorService;
    advertiserService;
    constructor(jwtService, adminService, vendorService, advertiserService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.vendorService = vendorService;
        this.advertiserService = advertiserService;
    }
    async validateUser(username, pass, user_type) {
        let user;
        switch (user_type) {
            case user_type_enum_1.UserType.ADMIN:
                user = await this.adminService.findByEmail(username);
                break;
            case user_type_enum_1.UserType.VENDOR:
                user = await this.vendorService.findByEmail(username);
                break;
            case user_type_enum_1.UserType.ADVERTISER:
                user = await this.advertiserService.findByEmail(username);
                break;
            default:
                throw new common_1.UnauthorizedException('Invalid user type');
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async generateToken(user) {
        const payload = {
            sub: user.id,
            username: user.name,
            roles: [user.userType],
        };
        console.log('Generating token for user:', payload);
        return {
            user: user,
            token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_service_1.AdminService,
        vendor_service_1.VendorService,
        advertiser_service_1.AdvertiserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map