import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { CONFIG } from "../../utils/globals";
export default class ImageCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["i"],

            args: [
                {
                    key: "image",

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
        { image }: { image: string;}
    ): Promise<Message | Message[]> {
        const embed = new MessageEmbed()
            .setImage(image)
            .setColor(CONFIG.colours.yellow);
        return msg.channel.send(embed);
    }
}