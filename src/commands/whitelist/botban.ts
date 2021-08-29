import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import { getUser } from "../../utils/getUser";
export default class BotBanCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {

                    key: "botbanuserID",

                    prompt: "Please provide the ID of the user you are banning.",

                    type: "string"
                },
                {

                    key: "botbanreason",

                    prompt: "Please provide the reason for the bot ban!",

                    type: "string"
                }
            ],

            description: "Bot Moderator Command only.",

            group: "group1",

            guildOnly: true,

            memberName: "botban",

            name: "botban",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { botbanuserID, botbanreason }: { botbanreason: string; botbanuserID: string; }
    ): Promise<Message | Message[]> {
        const botMod = STORAGE.botmods.find((c) => c.botmodid === msg.author.id);
        if (botMod === undefined)
            return msg.reply("You are not a bot moderator. You cannot use this command.");


        if (msg.guild === null) return msg.say("there was an error?");
        const user = await getUser(botbanuserID, msg.client);
        if (user === null)
            return msg.reply("Please provide a valid ID!");
        const botbanuser = db.get(`botban_${user.id}`);
        if (botbanuser === true)
            return msg.reply(`**${user.tag}** is already banned from the bot!`);
        if (botbanuser === null)
            db.set(`botban_${user.id}`, true);
        if (user.id === CONFIG.owner)
            return msg.reply("Cunt you are not allowed to ban the owner.");
        const banembed = new MessageEmbed()
            .setTitle(`${user.tag} has been bot banned!`)
            .setAuthor(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true, size: 2048 })}`)
            .setColor(CONFIG.colours.red)
            .setDescription(`User ID: ${user.id}\nBot Moderator: ${msg.author.id} - ${msg.author.toString()}\nReason:${botbanreason}`)
            .setFooter("Please go to #support and select number 6 to appeal the ban.")
            .setTimestamp();
        const bandm = new MessageEmbed()
            .setTitle("You are banned from using Alice.")
            .setColor(CONFIG.colours.red)
            .setDescription(`Reason: ${botbanreason}`)
            .setFooter("Please go to #support and select number 6 to appeal the ban.")
            .setTimestamp();
        const banlogserver: Guild = await msg.client.guilds.fetch(STORAGE.botbanserver);

        const banlogchannel: TextChannel = banlogserver.channels.cache.get(STORAGE.botbanchannel) as TextChannel;
        void banlogchannel.send(`${user.toString()}`);
        void user.send(bandm);
        void banlogchannel.send(banembed);

        return msg.say(`**${user.tag}** has been banned from using the bot!`);
    }
}