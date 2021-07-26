import { dump, load } from "js-yaml";
import { STORAGE } from "./globals";
import fs from "fs";

export interface Roles {
    botupdates: string;
    identifier: string;
    roleID: string;
    userID: string;

}
export interface ModLogs {
    channelID: string;
    serverID: string;
}

export interface WarnLogs {
    channelID: string;
    serverID: string;
}

/**
 * This represents the storage.yml
 * @class Storage
 * @property {string[]} channels
 */
export default class Storage {
    private static readonly _configLocation = "./storage.yml";

    public botlogchannel: string;

    public botlogserver: string;

    public botupdates: string;

    public developers: string[];

    public guildjoins: string;

    public modlogs: ModLogs[];

    public qotdchannel: string;

    public qotdping: string;

    public qotdserver: string;

    public warnlogs: WarnLogs[];

    private constructor() {
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
    public static getConfig(): Storage {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!fs.existsSync(Storage._configLocation)) {
            throw new Error("Please create a storage.yml");
        }
        const fileContents = fs.readFileSync(
            Storage._configLocation,
            "utf-8"
        );
        const casted = load(fileContents) as Storage;

        return casted;
    }

    /**
   *  Safe the config to the storage.yml default location
   */
    public static saveConfig(): void {
        fs.writeFileSync(Storage._configLocation, dump(STORAGE));
    }
}