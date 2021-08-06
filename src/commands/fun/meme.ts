import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { randomBunny } from "random-bunny";
export default class RedditCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            description: "Commando subreddit command.",

            group: "fun",

            guildOnly: true,

            memberName: "meme",

            name: "meme",


            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage
    ): Promise<Message | Message[]> {
        const reddit = [
            "dankmemes",
            "animemes",
            "me_irl",
            "internet_funeral",
            "memes",
            "facepalm",
            "Animemes"


        ];
        const subreddit = reddit[Math.floor(Math.random() * reddit.length)];
        return randomBunny(`${subreddit}`, "top", async (res: { title: string; url: string; }) => {
            const loading = new MessageEmbed()
                .setTitle("Please wait...")
                .setDescription("<a:AH_LoAding:776776118401368064> Loading image...")
                .setFooter("Your meme is loading");

            const loaded = new MessageEmbed()
                .setColor("#EFFF00")
                .setImage(res.url)
                .setTitle(res.title)
                .setDescription(`From [r/${subreddit}](https://reddit.com/r/${subreddit})`)
                .setFooter("Enjoy your meme <3")
                .setTimestamp();
            const m = await msg.channel.send(loading);
            return m.edit(loaded);

        });

    }
}