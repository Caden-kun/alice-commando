import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
// Creates a new class (being the command) extending off of the commando client
export default class EmbedCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            aliases: ["e"],
            args: [
                {
                    error: "Your title must be under 256 characters! Please shorten your title!",
                    key: "title",
                    prompt: "Please add a title to the embed!",
                    type: "string",
                    validate: (value: string): boolean => value.length < 256
                },
                {
                    error: "Your description must be under 4096 characters! Please shorten your description!",
                    key: "description",
                    prompt: "Nice, you added a title, now please add a description to the embed!",
                    type: "string",
                    validate: (value: string): boolean => value.length < 4096,
                    wait: 90

                },
                {
                    error: "Please enter a valid HEX color code.",
                    key: "color",
                    prompt: "Cool, now you have a description and title! Please enter a hex code for the color of the embed.",
                    type: "string",
                    validate: (value: string): boolean => value.length < 7
                },
                {
                    key: "image",
                    prompt: "One last thing, would you like to add an image to your embed? Type `null` if you do not want to have an image added.",
                    type: "string"
                }
            ],

            clientPermissions: ["MANAGE_MESSAGES"],

            description: "Creates an embed for the user",

            group: "utility",

            guildOnly: true,

            memberName: "embed",

            name: "embed",

            throttling: {
                duration: 5,
                usages: 3
            }


        });
    }

    // Now to run the actual command, the run() parameters need to be defiend (by types and names)
    public async run(
        msg: commando.CommandoMessage,
        { title, description, color, image }: { color: string; description: string; image: string; title: string;}
    ): Promise<Message | Message[]> {
        if (image === "null") image = "https://yourmomgay.com";
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setImage(image)
            .setColor(color)
            .setFooter(`${msg.guild?.name} • ${msg.author.tag}`);
        return msg.channel.send(embed);
    }
}
