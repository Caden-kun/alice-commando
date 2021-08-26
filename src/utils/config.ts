import { dump, load } from "js-yaml";
import { CONFIG } from "./globals";
import fs from "fs";

export interface Colours {
    blue: string;
    green: string;
    red: string;
    yellow: string;
}


/**
 * This represents the config.yml
 * @class Config
 * @property {string[]} channels
 */
export default class Config {
    private static readonly _configLocation = "./config.yml";

    public readonly colours: Colours;

    public readonly dev: string;

    public giphyAPI: string;

    public readonly kickfailerror: string;

    public readonly kickfailstaff: string;

    public readonly kickhelp: string;

    public readonly kicknoperms: string;

    public readonly kickself: string;

    public readonly owner: string;

    public readonly owners: string | string[] | undefined;

    public readonly prefix: string;


    public readonly token: string;


    public topGGKey: string;


    private constructor() {
        this.colours = { blue: "", green: "", red: "", yellow: "" };
        this.dev = "";
        this.giphyAPI = "";
        this.kicknoperms = "";
        this.kickfailerror = "";
        this.kickfailstaff = "";
        this.kickhelp = "";
        this.kickself = "";
        this.owner = "";
        this.prefix = "";
        this.topGGKey = "";
        this.token = "";

    }

    /**
       *  Call getConfig instead of constructor
       */
    public static getConfig(): Config {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!fs.existsSync(Config._configLocation)) {
            throw new Error("Please create a config.yml");
        }
        const fileContents = fs.readFileSync(
            Config._configLocation,
            "utf-8"
        );
        const casted = load(fileContents) as Config;

        return casted;
    }

    /**
   *  Safe the config to the config.yml default location
   */
    public static saveConfig(): void {
        fs.writeFileSync(Config._configLocation, dump(CONFIG));
    }
}