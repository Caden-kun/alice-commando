import * as qdb from "quick.db";
import { Client, CommandoMessage, Inhibition, SQLiteProvider } from "discord.js-commando";
import { AutoQotd } from "./events/AutoQotd";
import { CONFIG } from "./utils/globals";
import { Collection } from "discord.js";
import { Collections } from "./utils/types";
import { Database } from "sqlite3";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { messageUpdate } from "./events/onMessageEdit";
import { onAutoPoster } from "./events/autoposter";
import { onCommandRun } from "./events/commandRun";
import { onDelete } from "./events/onDelete";
import { onGuildCreate } from "./events/guildCreate";
import { onGuildDelete } from "./events/onGuildDelete";
import { onMessage } from "./events/onMessage";
import { onReady } from "./events/ready";
import { open } from "sqlite";
import path from "path";
require("discord-reply");
export const col: Collections = {
    aliases: new Collection(),
    commands: new Collection(),
    cooldowns: new Collection()
};
async function main(): Promise<void> {
    const client = new Client({

        commandPrefix: CONFIG.prefix,
        owner: CONFIG.owners

    });

    // Runs the onReady function defined in ./events/ready
    client.on("ready", async () => void onReady(client));

    client.on("ready", async () => void AutoQotd(client));

    client.on("ready", () => void onAutoPoster(client));

    client.on("message", async (msg) => void onMessage(msg));

    client.on("messageUpdate", async (newMsg, oldMsg) => void messageUpdate(newMsg, oldMsg));

    client.on("guildCreate", (guild) => void onGuildCreate(client, guild));

    client.on("guildDelete", (guild) => void onGuildDelete(client, guild));

    client.on("commandRun", (cmd, _promise, msg) => void onCommandRun(cmd, msg));

    client.on("messageDelete", (msg) => void onDelete(msg));

    client.dispatcher.addInhibitor((msg: CommandoMessage) => {
        const botbanuser = qdb.get(`botban_${msg.author.id}`);
        if (botbanuser === true) {
            const inhibit: Inhibition = {
                reason: "You have been banned from using Alice.",
                response: msg.say("You have been banned from using alice."
                + "\nYou can appeal the ban by joining the support server here: https://discord.gg/DsTsNCvumJ")
            };
            return inhibit;
        }
        return false;
    });

    // Registers all groups/commands/etc
    client.registry.registerDefaultTypes()
        .registerGroups([
            ["group1", "first batch of commands"],
            ["fun", "fun commands"],
            ["utility", "useful commands"],
            ["moderation", "commands used to moderate servers"],
            ["logging", "commands used to set log channels"]
        ]).registerDefaultGroups()
        .registerDefaultCommands({
            unknownCommand: false
        })

        .registerCommandsIn(
            path.join(__dirname, "commands")
        );

    void open({
        driver: Database,
        filename: path.join(__dirname, "../settings.sqlite3")
    }).then(async (db) => {
        await client.setProvider(new SQLiteProvider(db));
    });

    await client.login(CONFIG.token);
}

main().catch(console.error);

