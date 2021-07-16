import { Guild, GuildChannel } from "discord.js";
/**
 *
 * @param {string}
 * @param {Guild}
 * @returns {GuildMember | null}
 */


export function getChannel(cid: string, guild: Guild): GuildChannel | undefined {
    let cidParsed = cid;


    if (cid.startsWith("<#") && cid.endsWith(">")) {
        const re = new RegExp("[<#>]", "g");
        cidParsed = cid.replace(re, "");
    }

    try {
        return guild.channels.cache.get(cidParsed);
    } catch (e) {
        console.log(`Channel not found because ${e}`);
        return undefined;
    }

}