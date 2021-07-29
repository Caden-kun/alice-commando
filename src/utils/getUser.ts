import { Client, User } from "discord.js";

/**
 * Used to check member mentions/ID's if they are roles
 * @param {string} uid The User's ID
 * @param {Client} the Client instance the of where the Member is from
 * @returns {User | null} A User instance from the Client or null
 */
export async function getUser(uid: string | undefined, client: Client): Promise<User | null> {
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
        return await client.users.fetch(uidParsed);
    } catch (e) {
        console.log(`Member not found because ${e}`);
        return null;
    }
}
