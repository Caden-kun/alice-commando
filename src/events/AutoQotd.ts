import { STORAGE, qotdping } from "../utils/globals";
import { CommandoClient } from "discord.js-commando";
import { TextChannel } from "discord.js";
import { randomQuestion } from "random-question";

let qotd = randomQuestion();
// eslint-disable-next-line @typescript-eslint/naming-convention
export async function AutoQotd(client: CommandoClient): Promise<void> {
    console.log("AutoQotd Service Running.");
    const channels = STORAGE.AutoQotd;
    let qotdtext = `${qotdping} **Today's Question Of The Day:** ${qotd}`;

    channels.forEach(async (ch) => {
        const channel = client.channels.cache.get(ch.qotdchannel) as TextChannel | undefined;

        if (channel === undefined) return;

        await channel.send(qotdtext);

    });
    setInterval(() => {
        qotd = randomQuestion();
        qotdtext = `${qotdping} **Today's Question Of The Day:** ${qotd}`;
        console.log(qotd);
        channels.forEach(async (ch) => {
            const channel = client.channels.cache.get(ch.qotdchannel) as TextChannel | undefined;

            if (channel === undefined) return;

            await channel.send(qotdtext);

        });
    }, 86400000); // Runs this every 24 Hours
}