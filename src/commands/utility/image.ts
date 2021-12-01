import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
export default class ImageCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "image",

                    prompt: "please give a link of the image you want to display!",

                    type: "string"
                },
                {
                    default: "",

                    key: "addontext",

                    prompt: "please give a link of the image you want to display!",

                    type: "string"
                }
            ],


            description: "sends an image in an embed",

            group: "utility",

            guildOnly: true,


            memberName: "image",

            name: "image",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { image, addontext }: { addontext: string; image: string; }
    ): Promise<Message | Message[]> {
        void msg.delete();
        const embed = new MessageEmbed()
            .setTitle(`${msg.author.username}'s Image:`)
            .setDescription(addontext)
            .setImage(image)
            .setColor(CONFIG.colours.yellow)
            .setTimestamp();
        return msg.channel.send(embed);
    }
}