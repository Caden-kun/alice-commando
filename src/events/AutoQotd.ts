import { STORAGE, qotdping } from "../utils/globals";
import { CommandoClient } from "discord.js-commando";
import Storage from "../utils/storage";
import { TextChannel } from "discord.js";
import { randomQuestion } from "random-question";
// eslint-disable-next-line @typescript-eslint/naming-convention
export async function AutoQotd(client: CommandoClient): Promise<void> {
    console.log("AutoQotd Service Running.");
    const channels = STORAGE.AutoQotd;
    let qotdtext = `${qotdping} **Today's Question Of The Day:** ${randomQuestion()}`;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    setInterval(() => {
        STORAGE.randomQuestion = randomQuestion();
        Storage.saveConfig();
        console.log(STORAGE.randomQuestion);

    }, 60000); // Runs this every 24 Hours

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (qotdping === null)
        qotdtext = `**Today's Question Of The Day:** ${STORAGE.randomQuestion}`;

    channels.forEach(async (ch) => {
        const channel = client.channels.cache.get(ch.qotdchannel) as TextChannel | undefined;

        if (channel === undefined) return;

        await channel.send(qotdtext);

    });
    setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (qotdping === null)
            qotdtext = `**Today's Question Of The Day:** ${STORAGE.randomQuestion}`;
        channels.forEach(async (ch) => {
            const channel = client.channels.cache.get(ch.qotdchannel) as TextChannel | undefined;

            if (channel === undefined) return;

            await channel.send(qotdtext);

        });
    }, 86400000); // Runs this every 24 Hours
}