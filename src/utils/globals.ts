import Config from "./config";
import Storage from "./storage";

export const CONFIG = Config.getConfig();
export const STORAGE = Storage.getConfig();

export const discordLogo = "http://cadenkun.com/discord.png";

export const topgglink = "https://top.gg/bot/720809995628707902/vote";
export const dbllink = "https://discordbotlist.com/bots/alice-zuberg";

export function paginate(array: string[], pageSize: number, pageNumber: number): string[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}