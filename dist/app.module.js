"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./config/database.module");
const admin_module_1 = require("./modules/admin/admin.module");
const vendor_module_1 = require("./modules/vendor/vendor.module");
const advertiser_module_1 = require("./modules/advertiser/advertiser.module");
const place_module_1 = require("./modules/place/place.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./modules/auth/guard/jwt-auth.guard");
const jwt_strategy_1 = require("./modules/auth/jwt.strategy");
const auth_module_1 = require("./modules/auth/auth.module");
const roles_guard_1 = require("./modules/auth/guard/roles.guard");
const s3_bucket_module_1 = require("./modules/s3_bucket/s3_bucket.module");
const upload_file_module_1 = require("./modules/upload_file/upload_file.module");
const place_category_module_1 = require("./modules/place_category/place_category.module");
const city_module_1 = require("./modules/city/city.module");
const screen_module_1 = require("./modules/screen/screen.module");
const content_module_1 = require("./modules/content/content.module");
const config_1 = require("@nestjs/config");
const config_2 = __importDefault(require("./config/config"));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
                load: [config_2.default],
            }),
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule,
            admin_module_1.AdminModule,
            vendor_module_1.VendorModule,
            advertiser_module_1.AdvertiserModule,
            s3_bucket_module_1.S3BucketModule,
            upload_file_module_1.UploadModule,
            place_module_1.PlaceModule,
            place_category_module_1.PlaceCategoryModule,
            city_module_1.CityModule,
            screen_module_1.ScreenModule,
            content_module_1.ContentModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            jwt_strategy_1.JwtStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map