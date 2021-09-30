import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed } from "discord.js";
import { getUser } from "../../utils/getUser";
export default class NoteCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {

                    key: "noteuserid",

                    prompt: "Please provide the ID of the user you are adding a note to.",

                    type: "string"
                }
            ],

            description: "Adds a note to a user. (moderation command)",

            group: "moderation",

            guildOnly: true,

            memberName: "notes",

            name: "notes",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { noteuserid }: { note: string; noteuserid: string; }
    ): Promise<Message | Message[]> {

        if (msg.guild === null) return msg.say("there was an error?");
        const user = await getUser(noteuserid, msg.client);
        if (user === null)
            return msg.reply("Please provide a valid ID!");

        const nuser = STORAGE.notes.filter((c) => c.serverID === msg.guild?.id)
            .find((c) => c.userID === user.id);

        console.log(`${nuser?.userID} = ${user.id}`);
        if (nuser?.serverID !== msg.guild.id)
            return msg.reply("This user does not have any notes added for this server.");

        if (nuser.userID !== user.id)
            return msg.reply("This user does not have any notes added.");

        const noteembed = new MessageEmbed()
            .setTitle(`${user.tag} has 1 note:`)
            .setDescription(`Note: ${nuser.note}\nNote added by: <@${nuser.modID}>\nDate added: ${nuser.timeStamp}`)
            .setColor(CONFIG.colours.yellow)
            .setTimestamp();
        return msg.channel.send(noteembed);
    }
}