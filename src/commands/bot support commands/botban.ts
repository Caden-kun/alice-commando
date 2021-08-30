import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import Storage from "../../utils/storage";
import { getMember } from "../../utils/getMember";
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

        if (user.id === CONFIG.owner)
            return msg.reply("http://cadenkun.com/caughtin4k.gif");
        const botstaff = STORAGE.botmods.find((c) => c.botmodid === user.id);
        if (botstaff !== undefined)
            return msg.reply("You cannot ban other members of the Bot Staff. Not cool dude.");

        const buser = STORAGE.banneduser.find((c) => c.userid === user.id);
        if (buser !== undefined)
            return msg.reply("This user is already banned!");
        const botbanreference = db.add("botbancase", 1);
        const botmoderator = await getMember(msg.author.id, msg.guild);
        if (botmoderator === null) return msg.reply("there was an error?");
        const rank = botmoderator.roles.highest.name;

        STORAGE.banneduser.push({ banreason: botbanreason, botmod: `${msg.author.tag} || \`${rank}\``, referencenumber: botbanreference, userid: user.id, usertag: user.tag });
        Storage.saveConfig();
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
            .setDescription(`Reason: ${botbanreason}\nReference Number: \`${botbanreference}\``)
            .setFooter("Please go to #support and select number 6 to appeal the ban.")
            .setTimestamp();
        const banlogserver: Guild = await msg.client.guilds.fetch(STORAGE.botbanserver);

        const banlogchannel: TextChannel = banlogserver.channels.cache.get(STORAGE.botbanchannel) as TextChannel;
        void banlogchannel.send(`${user.toString()}`);
        void user.send(bandm);
        void banlogchannel.send(banembed);

        const botbanembed = new MessageEmbed()
            .setDescription(`${user.tag} has been banned.\nReference Number: \`${botbanreference}\``)
            .setColor(CONFIG.colours.yellow);
        return msg.channel.send(botbanembed);
    }
}