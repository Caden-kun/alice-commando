import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
import fetch from "node-fetch";
import querystring from "querystring";
export default class GifCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            args: [
                {
                    default: "cats",

                    key: "gifterm",

                    prompt: "Provide a gif term",

                    type: "string"
                }
            ],
            description: "Gets a GIF from Tenor then sends you the results.",

            group: "fun",

            guildOnly: true,

            memberName: "gif",

            name: "gif",

            ownerOnly: false,

            throttling: {
                duration: 5,
                usages: 5
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { gifterm }: { gifterm: string; }
    ): Promise<Message | Message[]> {
        const query = querystring.stringify({ term: gifterm });
        const url = `https://g.tenor.com/v1/search?q=${query}&key=${CONFIG.tenorAPI}&contentfilter=low`;
        const response = await fetch(url);
        const json = await response.json();
        const random = Math.floor(Math.random() * json.results.length);
        const loading = new MessageEmbed()
            .setTitle("Please wait...")
            .setColor(CONFIG.colours.yellow)
            .setDescription("<a:AH_LoAding:776776118401368064> Loading GIF...")
            .setFooter("Your GIF being fetched. This won't take long.");
        const embed = new MessageEmbed()
            .setTitle(`GIF Results - **${gifterm}:**`)
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
            .setColor(CONFIG.colours.yellow)
            .setImage(json.results[random].media[0].gif.url)
            .setFooter("Hopefully this is the GIF you were looking for <3.")
            .setTimestamp();
        const m = await msg.channel.send(loading);
        return m.edit(embed);
    }
}