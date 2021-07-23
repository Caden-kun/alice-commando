import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { Argument } from "discord.js-commando";
// Creates a new class (being the command) extending off of the commando client
export default class EmbedCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {
            aliases: ["e"],
            args: [
                {
                    error: "Your title must be under 256 characters! Please shorten your title!",
                    key: "title",
                    parse: async (value: string, originalMsg: Message, currentMsg: Argument): Promise<void> => {
                        console.log(value);
                        console.log(originalMsg.content);
                        console.log(currentMsg);
                    },
                    prompt: "Please add a title to the embed!",
                    type: "message",
                    validate: (value: string): boolean => value.length < 256
                },
                {
                    error: "Your description must be under 4096 characters! Please shorten your description!",
                    key: "description",
                    parse: async (value: string, originalMsg: Message, currentMsg: Argument): Promise<void> => {
                        console.log(value);
                        console.log(originalMsg.content);
                        console.log(currentMsg);
                    },
                    prompt: "Nice, you added a title, now please add a description to the embed!",
                    type: "message",
                    validate: (value: string): boolean => value.length < 4096,
                    wait: 90

                },
                {
                    error: "Please enter a valid HEX color code.",
                    key: "color",
                    parse: async (value: string, originalMsg: Message, currentMsg: Argument): Promise<void> => {
                        console.log(value);
                        console.log(originalMsg.content);
                        console.log(currentMsg);
                    },
                    prompt: "Cool, now you have a description and title! Please enter a hex code for the color of the embed.",
                    type: "message",
                    validate: (value: string): boolean => value.length < 7
                },
                {
                    key: "image",
                    parse: async (value: string, originalMsg: Message, currentMsg: Argument): Promise<void> => {
                        console.log(value);
                        console.log(originalMsg.content);
                        console.log(currentMsg.parser);
                    },
                    prompt: "One last thing, would you like to add an image to your embed? Type `null` if you do not want to have an image added.",
                    type: "message"
                }
            ],

            clientPermissions: ["MANAGE_MESSAGES"],

            description: "I can say whatever the user wants!",

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
        { title, description, color, image }: { color: Message; description: Message; image: Message; title: Message;}
    ): Promise<Message | Message[]> {

        void title.delete();
        void description.delete();
        void color.delete();
        void image.delete();
        void msg.delete();

        if (image.content === "null") image.content = "https://yourmomgay.com";
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setImage(image.content)
            .setColor(color.content)
            .setFooter(`${msg.guild?.name} • ${msg.author.tag}`);
        return msg.channel.send(embed);
    }
}
