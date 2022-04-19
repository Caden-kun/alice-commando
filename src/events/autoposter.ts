import { AutoPoster } from "topgg-autoposter";
import { CONFIG } from "../utils/globals";
import { CommandoClient } from "discord.js-commando";
export async function onAutoPoster(client: CommandoClient): Promise<void> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const poster = AutoPoster(CONFIG.topGGKey, client); // Your discord.js or eris client
    } catch (error) {
        console.log("top.gg autoposter error!");
    }
}