import { STORAGE, qotdping } from "../utils/globals";
import { CommandoClient } from "discord.js-commando";
import Storage from "../utils/storage";
import { TextChannel } from "discord.js";
import cron from "cron";
import { randomQuestion } from "random-question";
// eslint-disable-next-line @typescript-eslint/naming-convention
export async function AutoQotd(client: CommandoClient): Promise<void> {
    console.log("AutoQotd Service Running.");

    // eslint-disable-next-line prefer-destructuring
    const qotd = STORAGE.qotd;
    const channels = STORAGE.AutoQotd;
    const qotdtext = `${qotdping} **Today's Question Of The Day:** ${qotd}`;


    setInterval(() => {
        STORAGE.qotd = randomQuestion();
        Storage.saveConfig();

    }, 43200000); // Runs this every 12 hours. Part 1 of the Random Question Generator.
    const qotdtime = new cron.CronJob("00 14 00 * * *", () => {


        channels.forEach(async (ch) => {
            const channel = client.channels.cache.get(ch.qotdchannel) as TextChannel | undefined;
            if (channel === undefined) return;
            await channel.send(qotdtext);
        });
    });
    qotdtime.start();
}