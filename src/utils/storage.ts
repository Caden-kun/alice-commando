import { dump, load } from "js-yaml";
import { STORAGE } from "./globals";
import fs from "fs";

export interface AutoQotd {
    qotdchannel: string;
    qotdserver: string;
}
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
export interface IgnoredUsers {
    ignoredusers: string;
}
export interface Osu {
    osuid: string;
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
    private static readonly _configLocation = "./../storage.yml";

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public AutoQotd: AutoQotd[];

    public banneduser: BannedUser[];

    public botbanchannel: string;

    public botbanserver: string;

    public botlogchannel: string;

    public botlogserver: string;

    public botmods: BotMods[];

    public botupdates: string;

    public cadentime: string;

    public developers: string[];

    public guildjoins: string;

    public ignoredusers: IgnoredUsers[];

    public membercount: number;

    public modlogs: ModLogs[];

    public noeltime: string;

    public notes: Notes[];

    public osu: Osu[];

    public qotd: string;

    public randomQuestion: string;

    public suggestionchannel: string;

    public suggestionserver: string;

    public victime: string;

    public warnlogs: WarnLogs[];


    private constructor() {
        this.AutoQotd = [{ qotdchannel: "", qotdserver: "" }];
        this.banneduser = [{ banreason: "", botmod: "", referencenumber: 0, userid: "", usertag: "" }];
        this.botbanserver = "";
        this.botbanchannel = "";
        this.botupdates = "";
        this.botlogserver = "";
        this.botlogchannel = "";
        this.botmods = [{ botmodid: "" }];
        this.cadentime = "";
        this.developers = [""];
        this.guildjoins = "";
        this.ignoredusers = [{ ignoredusers: "" }];
        this.membercount = 0;
        this.modlogs = [{ channelID: "", serverID: "" }];
        this.noeltime = "";
        this.notes = [{ modID: "", note: "", serverID: "", timeStamp: "", userID: "" }];
        this.osu = [{ osuid: "" }];
        this.qotd = "";
        this.randomQuestion = "";
        this.suggestionchannel = "";
        this.suggestionserver = "";
        this.victime = "";
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