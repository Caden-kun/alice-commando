import { Guild, GuildChannel } from "discord.js";

/**
 * Used to check role mentions/ID's if they are roles
 * @param {string} cid The channel mention/ID
 * @param {Guild} guild the Guild instance the of where the Channel is from
 * @returns {GuildChannel} A Channel instance or undefined
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