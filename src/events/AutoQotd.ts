/* eslint-disable prefer-destructuring */
import { STORAGE, qotdping } from "../utils/globals";
import { CommandoClient } from "discord.js-commando";
import { TextChannel } from "discord.js";
import cron from "cron";
import { randomQuestion } from "random-question";
// eslint-disable-next-line @typescript-eslint/naming-convention
export async function AutoQotd(client: CommandoClient): Promise<void> {


    const qotdtime = new cron.CronJob("00 29 00 * * *", () => {

        const newQuestion = randomQuestion();
        const qotdtext = `${qotdping} **Today's Question Of The Day:** ${newQuestion}`;

        console.log(newQuestion);


        const channels = STORAGE.AutoQotd;
        channels.forEach(async (ch) => {
            const channel = client.channels.cache.get(ch.qotdchannel) as TextChannel | undefined;
            if (channel === undefined) return;
            await channel.send(qotdtext);
        });
    });
    qotdtime.start();
}