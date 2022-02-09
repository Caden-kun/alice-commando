import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
// Creates a new class (being the command) extending off of the commando client
export default class StfufoxCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            aliases: ["stfufox"],
            args: [
                {
                    error: "Your title must be under 256 characters! Please shorten your title!",
                    key: "title",
                    prompt: "Bitch, add a title.",
                    type: "string",
                    validate: (value: string): boolean => value.length < 256
                },
                {
                    error: "Your description must be under 4096 characters! Please shorten your description!",
                    key: "description",
                    prompt: "Okay, your bitchass managed to add a title, now add the description.",
                    type: "string",
                    validate: (value: string): boolean => value.length < 4096,
                    wait: 90

                },
                {
                    error: "Please enter a valid HEX color code.",
                    key: "color",
                    prompt: "Cool cool, now the color. (HEX code if you didn't know you fucker)",
                    type: "string",
                    validate: (value: string): boolean => value.length < 7
                },
                {
                    key: "image",
                    prompt: "Image or nah? just respond with null if no image is added.",
                    type: "string"
                }
            ],

            clientPermissions: ["MANAGE_MESSAGES"],

            description: "A custom embed command to shut fox the fuck up.",

            group: "utility",

            guildOnly: true,

            memberName: "foxstfu",

            name: "foxstfu",

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
        if (image === "null") image = "https://media.cadenkun.com/nullimage.lol";
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setImage(image)
            .setColor(color);
        return msg.channel.send(embed);
    }
}
