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
export interface BotMods {
    botmodid: string;
}
export interface WarnLogs {
    channelID: string;
    serverID: string;
}

export interface Notes {
    modID: string;
    note: string;
    serverID: string;
    timeStamp: string;
    userID: string;
}
export interface BannedUser {
    banreason: string;
    botmod: string;
    referencenumber: number;
    userid: string;
    usertag: string;

}
/**
 * This represents the storage.yml
 * @class Storage
 * @property {string[]} channels
 */
export default class Storage {
    private static readonly _configLocation = "./storage.yml";

    public banneduser: BannedUser[];

    public botbanchannel: string;

    public botbanserver: string;

    public botlogchannel: string;

    public botlogserver: string;

    public botmods: BotMods[];

    public botupdates: string;

    public developers: string[];

    public guildjoins: string;

    public membercount: string;

    public modlogs: ModLogs[];

    public notes: Notes[];

    public qotdchannel: string;

    public qotdping: string;

    public qotdserver: string;

    public suggestionchannel: string;

    public suggestionserver: string;

    public warnlogs: WarnLogs[];


    private constructor() {
        this.banneduser = [{ banreason: "", botmod: "", referencenumber: 0, userid: "", usertag: "" }];
        this.botbanserver = "";
        this.botbanchannel = "";
        this.botupdates = "";
        this.botlogserver = "";
        this.botlogchannel = "";
        this.botmods = [{ botmodid: "" }];
        this.developers = [""];
        this.guildjoins = "";
        this.membercount = "";
        this.modlogs = [{ channelID: "", serverID: "" }];
        this.notes = [{ modID: "", note: "", serverID: "", timeStamp: "", userID: "" }];
        this.qotdchannel = "";
        this.qotdserver = "";
        this.qotdping = "";
        this.suggestionchannel = "";
        this.suggestionserver = "";
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