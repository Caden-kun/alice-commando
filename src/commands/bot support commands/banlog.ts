import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed } from "discord.js";
export default class BanLog extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {

                    key: "banlog",

                    prompt: "Please provide the ID of the user.",

                    type: "string"
                }
            ],

            description: "Bot Moderator Command only.",

            group: "group1",

            guildOnly: true,

            memberName: "banlog",

            name: "banlog",

            ownerOnly: false,

            throttling: {
                duration: 10,
                usages: 5
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { banlog }: { banlog: string; }
    ): Promise<Message | Message[]> {
        const botMod = STORAGE.botmods.find((c) => c.botmodid === msg.author.id);
        if (botMod === undefined)
            return msg.reply("You are not a bot moderator. You cannot use this command.");


        if (msg.guild === null) return msg.say("there was an error?");

        const breference = STORAGE.banneduser.find((c) => c.userid === banlog);
        if (breference === undefined)
            return msg.reply("This case does not exist. The user was either unbanned or the User does not have any ban cases.");
        const embed = new MessageEmbed()
            .setTitle(`Ban Log for \`${breference.usertag}\`:`)
            .setColor(CONFIG.colours.yellow)
            .setDescription(`**Case Number:** ${breference.referencenumber}\n**User:** ${breference.usertag}\n**Reason For Ban:** ${breference.banreason}\n**Bot Moderator:** ${breference.botmod}`)
            .setFooter(`User ID: ${breference.userid}`);
        return msg.channel.send(embed);
    }
}