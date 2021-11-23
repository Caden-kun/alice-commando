import * as commando from "discord.js-commando";
import { CONFIG, STORAGE } from "../../utils/globals";
import { Message, MessageEmbed } from "discord.js";
import Storage from "../../utils/storage";
import { getUser } from "../../utils/getUser";
export default class AddNoteCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {

                    key: "noteuserid",

                    prompt: "Please provide the ID of the user you are adding a note to.",

                    type: "string"
                },
                {
                    error: "Your note may be over 500 characters! Please shorten your note and try again.",

                    key: "note",

                    prompt: "What are you adding to the user?",

                    type: "string",

                    validate: (value: string): boolean => value.length < 500
                }
            ],

            description: "Adds a note to a user. (moderation command)",

            group: "moderation",

            guildOnly: true,

            memberName: "addnote",

            name: "addnote",

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
        { noteuserid, note }: { note: string; noteuserid: string; }
    ): Promise<Message | Message[]> {

        if (msg.guild === null) return msg.say("there was an error?");
        const user = await getUser(noteuserid, msg.client);
        if (user === null)
            return msg.reply("Please provide a valid ID!");

        const nuser = STORAGE.notes.find((c) => c.userID === user.id);
        if (nuser?.serverID === msg.guild.id)
            return msg.reply("You already have notes for this user.");
        if (nuser?.userID === user.id)
            return msg.reply("This user already has notes added.");
        const d = new Date();
        const date = d.toDateString();
        STORAGE.notes.push({ modID: msg.author.id, note: `${note}`, serverID: msg.guild.id, timeStamp: date, userID: user.id });
        Storage.saveConfig();
        const noteembed = new MessageEmbed()
            .setDescription(`Note added to ${user.tag}. \nNote: \`${note}\``)
            .setColor(CONFIG.colours.yellow)
            .setTimestamp();
        return msg.channel.send(noteembed);
    }
}