import { Client } from "discord.js";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function onReady(bot: Client) {
    if (!bot.user) {
        return;
    }
    console.log(`${bot.user.tag} is online!`);
    void bot.user.setActivity("commando is gay", { type: "WATCHING" });
}
