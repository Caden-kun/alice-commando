import Config from "./config/config";
import Storage from "./storage";

export const CONFIG = Config.getConfig();
export const STORAGE = Storage.getConfig();

export const discordLogo = "http://cadenkun.com/discord.png";

export function paginate(array: string[], pageSize: number, pageNumber: number): string[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}