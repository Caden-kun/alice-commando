"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const storage_1 = __importDefault(require("./storage"));
exports.CONFIG = config_1.default.getConfig();
exports.STORAGE = storage_1.default.getConfig();
exports.discordLogo = "http://cadenkun.com/discord.png";
function paginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
exports.paginate = paginate;
