"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    logger = new common_1.Logger(AllExceptionsFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            if (typeof errorResponse === 'string') {
                message = errorResponse;
            }
            else if (typeof errorResponse === 'object' &&
                errorResponse !== null &&
                'message' in errorResponse) {
                message = Array.isArray(errorResponse['message'])
                    ? errorResponse['message'].join(', ')
                    : errorResponse['message'];
            }
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            const driverError = exception.driverError;
            switch (driverError.code) {
                case 'ER_DUP_ENTRY':
                    status = common_1.HttpStatus.CONFLICT;
                    message = 'Duplicate entry: record already exists';
                    break;
                case 'ER_NO_REFERENCED_ROW_2':
                case 'ER_ROW_IS_REFERENCED_2':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Invalid reference: related entity does not exist';
                    break;
                default:
                    message = driverError.message || message;
            }
        }
        this.logger.error(`HTTP Status: ${status} Error Message: ${message}`, exception instanceof Error ? exception.stack : '');
        response.status(status).json({
            statusCode: status,
            success: false,
            message,
            data: null,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all_exceptions.filter.js.map