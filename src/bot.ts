import { CONFIG } from "./globals";
import { Client } from "discord.js-commando";
import { onReady } from "./events";
import path from "path";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
    const bot = new Client({

        commandPrefix: CONFIG.prefix,
        owner: CONFIG.owners

    });

    // Runs the function defined in ./events
    bot.on("ready", () => void onReady(bot));

    // Registers all groups/commands/etc
    bot.registry.registerGroups([
        ["group1", "first batch of commands"],
        ["fun", "fun commands"]
    ]).registerDefaults()
        .registerCommandsIn(
            path.join(__dirname, "commands")
        );

    await bot.login(CONFIG.token);
}

main().catch(console.error);
