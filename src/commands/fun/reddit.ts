import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { randomBunny } from "random-bunny";
export default class SubRedditCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            args: [
                {
                    default: "dankmemes",

                    key: "sreddit",

                    prompt: "Provide a Subreddit!",

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
                usages: 5
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { sreddit }: { sreddit: string; }
    ): Promise<Message | Message[]> {

        return randomBunny(`${sreddit}`, "top", async (res: { title: string; url: string; }) => {
            const loading = new MessageEmbed()
                .setTitle("Please wait...")
                .setDescription("<a:AH_LoAding:776776118401368064> Loading image...")
                .setFooter("Your meme is loading");

            const loaded = new MessageEmbed()
                .setColor("#EFFF00")
                .setImage(res.url)
                .setTitle(res.title)
                .setDescription(`From [r/${sreddit}](https://reddit.com/r/${sreddit})`)
                .setFooter("Enjoy! <3")
                .setTimestamp();
            const m = await msg.channel.send(loading);
            return m.edit(loaded);

        });

    }
}