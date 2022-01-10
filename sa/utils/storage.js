"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = require("js-yaml");
const globals_1 = require("./globals");
const fs_1 = __importDefault(require("fs"));
/**
 * This represents the storage.yml
 * @class Storage
 * @property {string[]} channels
 */
class Storage {
    constructor() {
        this.botupdates = "";
        this.botlogserver = "";
        this.botlogchannel = "";
        this.developers = [""];
        this.guildjoins = "";
        this.modlogs = [{ channelID: "", serverID: "" }];
        this.qotdchannel = "";
        this.qotdserver = "";
        this.qotdping = "";
        this.warnlogs = [{ channelID: "", serverID: "" }];
    }
    /**
       *  Call getConfig instead of constructor
       */
    static getConfig() {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!fs_1.default.existsSync(Storage._configLocation)) {
            throw new Error("Please create a storage.yml");
        }
        const fileContents = fs_1.default.readFileSync(Storage._configLocation, "utf-8");
        const casted = js_yaml_1.load(fileContents);
        return casted;
    }
    /**
   *  Safe the config to the storage.yml default location
   */
    static saveConfig() {
        fs_1.default.writeFileSync(Storage._configLocation, js_yaml_1.dump(globals_1.STORAGE));
    }
}
exports.default = Storage;
Storage._configLocation = "./storage.yml";
