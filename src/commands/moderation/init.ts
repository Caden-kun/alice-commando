import * as commando from "discord.js-commando";
import { Message } from "discord.js";
import { STORAGE } from "../../utils/globals";
import Storage from "../../utils/storage";
import { getChannel } from "../../utils/getChannel";
export default class ModlogsetCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["setup"],

            args: [
                {
                    error: "Please provide a valid modlogs channel!",

                    key: "modlogs",

                    prompt: "**Setup: 1/2** Please mention a channel you want to set for **mod** logs.",

                    type: "string",

                    validate: (value: string): boolean => value.length > 2
                },
                {
                    error: "Please provide a valid warnings channel!",

                    key: "warnlogs",

                    prompt: "**Setup: 2/2** Please mention a channel you want to be set for **Warning** Logs.",

                    type: "string",

                    validate: (value: string): boolean => value.length > 2
                }
            ],

            description: "Simple setup command to add logs seamlessly.",

            group: "logging",

            guildOnly: true,

            memberName: "init",

            name: "init",

            ownerOnly: false,

            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { modlogs, warnlogs }: { modlogs: string; warnlogs: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.say("There was an error?");

        const modlog = getChannel(modlogs, msg.guild);
        const warnlog = getChannel(warnlogs, msg.guild);


        if (modlog === undefined) return msg.say("Please give me a **valid** channel");
        if (warnlog === undefined) return msg.say("Please give me a **valid** channel");

        const modGuild = STORAGE.modlogs.find((c) => c.serverID === msg.guild?.id);
        if (modGuild !== undefined)
            return msg.reply("You already have modlog channel set in the server! Please remove it then try running the setup command again.");
        const warnGuild = STORAGE.warnlogs.find((c) => c.serverID === msg.guild?.id);
        if (warnGuild !== undefined)
            return msg.reply("You already have warnings channel set in the server! Please remove it then try running the setup command again.");


        STORAGE.modlogs.push({ channelID: modlog.id, serverID: msg.guild.id });
        STORAGE.warnlogs.push({ channelID: warnlog.id, serverID: msg.guild.id });
        Storage.saveConfig();
        return msg.say(`The following channels has been set!\nMod Logs: ${modlog}\nWarning Logs:${warnlog}`);
    }
}