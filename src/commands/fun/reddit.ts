import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../globals";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";
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
            void m.edit(loaded);
            if (msg.guild === null)
                return msg.say("there was a problem?");
            const log = new MessageEmbed()
                .setTitle("Command used: Reddit")
                .setDescription(`User: ${msg.author} - ${msg.author.tag}\nServer ID: ${msg.guild.id}\nServer Name: ${msg.guild.name}\nSubreddit: ${subreddit}`)
                .setColor(CONFIG.colours.yellow)
                .setTimestamp();
            const botlogserver: Guild = await msg.client.guilds.fetch(STORAGE.botlogserver);

            const cuddlelog: TextChannel = botlogserver.channels.cache.get(STORAGE.botlogchannel) as TextChannel;
            return cuddlelog.send(log);
        });

    }
}