"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScreenDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_screen_dto_1 = require("./create-screen.dto");
class UpdateScreenDto extends (0, mapped_types_1.PartialType)(create_screen_dto_1.CreateScreenDto) {
}
exports.UpdateScreenDto = UpdateScreenDto;
//# sourceMappingURL=update-screen.dto.js.map