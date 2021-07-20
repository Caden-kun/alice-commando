import { Client, SQLiteProvider } from "discord.js-commando";
import { CONFIG } from "./globals";
import { Collection } from "discord.js";
import { Collections } from "./utils/types";
import { Database } from "sqlite3";
import { onGuildCreate } from "./events/guildCreate";
import { onGuildDelete } from "./events/guildDelete";
import { onMessage } from "./events/message";
import { onReady } from "./events/ready";
import { open } from "sqlite";
import path from "path";
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
    client.on("ready", () => void onReady(client, col));

    client.on("message", async (msg) => void onMessage(msg));

    client.on("guildCreate", (guild) => void onGuildCreate(guild));

    client.on("guildDelete", (guild) => void onGuildDelete(guild));

    // Registers all groups/commands/etc
    client.registry.registerGroups([
        ["group1", "first batch of commands"],
        ["fun", "fun commands"],
        ["utility", "useful commands"]
    ]).registerDefaults()
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
