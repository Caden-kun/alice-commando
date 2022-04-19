import { STORAGE, qotdping } from "../utils/globals";
import { CommandoClient } from "discord.js-commando";
import { TextChannel } from "discord.js";
import cron from "cron";
import { randomQuestion } from "random-question";
// eslint-disable-next-line @typescript-eslint/naming-convention
export async function AutoQotd(client: CommandoClient): Promise<void> {
    console.log("AutoQotd Service Running.");
    let qotd = randomQuestion();
    const channels = STORAGE.AutoQotd;
    const qotdtext = `${qotdping} **Today's Question Of The Day:** ${qotd}`;

    const qotdtime = new cron.CronJob("00 14 00 * * *", () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        qotd = randomQuestion();
        channels.forEach(async (ch) => {
            const channel = client.channels.cache.get(ch.qotdchannel) as TextChannel | undefined;
            if (channel === undefined) return;
            await channel.send(qotdtext);
        });
    });
    qotdtime.start();
}