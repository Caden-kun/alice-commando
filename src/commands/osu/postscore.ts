import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message, MessageEmbed } from "discord.js";
export default class PostStatsCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["sendstats"],

            description: "I say fuck you here's my osu stats",

            group: "utility",

            guildOnly: true,

            memberName: "postscore",

            name: "postscore",

            ownerOnly: false,

            throttling: {
                duration: 10,
                usages: 3
            },
            userPermissions: ["SEND_MESSAGES"]

        });
    }

    public async run(
        msg: commando.CommandoMessage
    ): Promise<Message | Message[]> {
        let noelscore = db.get("589290324464238592_osu");
        let cadenscore = db.get("597884706897264681_osu");
        let vicscore = db.get("456231737488441344_osu");

        if (noelscore === null) {
            noelscore = "No wins reported yet.";
        }
        if (cadenscore === null) {
            cadenscore = "No wins reported yet.";
        }
        if (vicscore === null) {
            vicscore = "No wins reported yet.";
        }
        const embed = new MessageEmbed()
            .setTitle("Osu Scoreboard:")
            .setDescription(`<@589290324464238592> - ${noelscore}\n<@597884706897264681> - ${cadenscore}\n<@456231737488441344> - ${vicscore}\n`)
            .setTimestamp();
        return msg.channel.send(embed);

    }
}