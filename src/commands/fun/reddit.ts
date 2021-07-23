import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { randomBunny } from "random-bunny";
export default class RedditCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "subreddit",

                    prompt: "Please choose a subreddit! \n(Please note, subreddits are case sensitive.)",

                    type: "string"
                }
            ],

            description: "Commando subreddit command.",

            group: "fun",

            guildOnly: true,

            memberName: "reddit",

            name: "reddit",


            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { subreddit }: { subreddit: string; }
    ): Promise<Message | Message[]> {

        return randomBunny(`${subreddit}`, "top", async (res: { title: string; url: string; }) => {
            console.log(`${res.title}: ${res.url}`);
            const loading = new MessageEmbed()
                .setTitle("Please wait...")
                .setDescription("<a:AH_LoAding:776776118401368064> Loading image...");

            const loaded = new MessageEmbed()
                .setColor("#EFFF00")
                .setImage(res.url)
                .setTitle(res.title)
                .setDescription(`From [r/${subreddit}](https://reddit.com/r/${subreddit})`);
            const m = await msg.channel.send(loading);
            return m.edit(loaded);

        });

    }
}