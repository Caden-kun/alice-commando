import { Guild, GuildMember } from "discord.js";
/**
 * Used to check member mentions/ID's if they are roles
 * @param {string} uid The Member's ID
 * @param {Guild} guild the Guild instance the of where the Member is from
 * @returns {GuildMember | null} A Member instance from a server or null
 */
export async function getMember(uid: string | undefined, guild: Guild): Promise<GuildMember | null> {
    if (uid === undefined) return null;
    let uidParsed = uid;
    // Check if a member was tagged or not. If the member was tagged remove the
    // Tag from uid.
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (uid.startsWith("<@") && uid.endsWith(">")) {
        const re = new RegExp("[<@!>]", "g");
        uidParsed = uid.replace(re, "");
    }

    if (uidParsed.length !== 18) {
        return null;
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return await guild.members.fetch(uidParsed);
    } catch (e) {
        console.log(`Member not found because ${e}`);
        return null;
    }
}
