import { Guild, GuildChannel, GuildMember, Role } from "discord.js";

// Added getRole function in here incase you don't like getMember (;
export async function getRole(rid: string, guild: Guild): Promise<Role | null> {
    let ridParsed = rid;
    // Check if a role was tagged or not. If the role was tagged remove the
    // Tag from rid.
    if (rid.startsWith("<@&") && rid.endsWith(">")) {
        const re = new RegExp("[<@&>]", "g");
        ridParsed = rid.replace(re, "");
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return await guild.roles.fetch(ridParsed);
    } catch (e) {
        console.log(`Role not found because ${e}`);
        return null;
    }
}

export async function getMember(uid: string, guild: Guild): Promise<GuildMember | null> {
    let uidParsed = uid;
    // Check if a member was tagged or not. If the member was tagged remove the
    // Tag from uid.
    if (uid.startsWith("<@") && uid.endsWith(">")) {
        const re = new RegExp("[<@!>]", "g");
        uidParsed = uid.replace(re, "");
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return await guild.members.fetch(uidParsed);
    } catch (e) {
        console.log(`Member not found because ${e}`);
        return null;
    }
}

export function getChannel(cid: string, guild: Guild): GuildChannel | undefined {
    let cidParsed = cid;
    // Check if a member was tagged or not. If the member was tagged remove the
    // Tag from uid.
    if (cid.startsWith("<#") && cid.endsWith(">")) {
        const re = new RegExp("[<#>]", "g");
        cidParsed = cid.replace(re, "");
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return guild.channels.cache.get(cidParsed);
    } catch (e) {
        console.log(`Channel not found because ${e}`);
        return undefined;
    }
}


