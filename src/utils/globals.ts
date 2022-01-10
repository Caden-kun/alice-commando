import { ColorResolvable, Message } from "discord.js";
import Config from "./config";
import Storage from "./storage";

export const CONFIG = Config.getConfig();
export const STORAGE = Storage.getConfig();

export const discordLogo = "http://cadenkun.com/discord.png";
export const qotdping = "<@&709068124359491636>";
export const topgglink = "https://top.gg/bot/720809995628707902/vote";
export const dbllink = "https://discordbotlist.com/bots/alice-zuberg";

export const replyembed = async (msg: Message, description: string, color?: ColorResolvable): Promise<Message> =>
    msg.channel.send({
        embed: {
            color: color ?? CONFIG.colours.yellow,
            description
        }
    });


export function dtimestamp(timestamp: number): string {
    return timestamp.toString().slice(0, 10);
}

export function paginate(array: string[], pageSize: number, pageNumber: number): string[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}