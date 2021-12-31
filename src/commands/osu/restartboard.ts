/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import * as commando from "discord.js-commando";
import * as db from "quick.db";
import { Message, MessageEmbed } from "discord.js";
import { STORAGE } from "../../utils/globals";
export default class RestartStatsCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            aliases: ["livescores"],

            description: "I say fuck you here's my osu stats",

            group: "utility",

            guildOnly: true,

            memberName: "livescore",

            name: "livescore",

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
        void msg.delete();
        const osuser = STORAGE.osu.find((c) => c.osuid === msg.author.id);
        if (osuser === undefined)
            return msg.reply("You do not have permission to use this command.");
        setInterval(async () => {
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
            let timevic = STORAGE.victime;
            let timecaden = STORAGE.cadentime;
            let timenoel = STORAGE.noeltime;
            if (STORAGE.victime === undefined) {
                timevic = "No last win recorded.";
            }
            if (STORAGE.cadentime === undefined) {
                timecaden = "No last win recorded.";
            }
            if (STORAGE.noeltime === undefined) {
                timenoel = "No last win recorded.";
            }

            const embed = new MessageEmbed()
                .setTitle("Osu Scoreboard:")
                .setColor("FC65A8")
                .setThumbnail("https://media.cadenkun.com/osulogo.png")
                .setDescription(`<@589290324464238592> - ${noelscore}\nLast win: <t:${timenoel}:R>\n\n<@597884706897264681> - ${cadenscore}\nLast win: <t:${timecaden}:R>\n\n<@456231737488441344> - ${vicscore}\nLast win: <t:${timevic}:R>`)
                .setTimestamp();
            void msg.channel.messages.fetch({ around: "926300386120302592", limit: 1 })
                .then(async (message) => {
                    const fetchedMsg = message.first();
                    if (fetchedMsg === undefined)
                        return msg.reply("there was an error");
                    void fetchedMsg.edit(embed);
                });

        }, 5000);
        return msg;
    }
}
