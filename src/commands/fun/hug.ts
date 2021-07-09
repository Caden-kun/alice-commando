import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { getMember } from "../../utils";

export default class HugCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
        super(client, {

            args: [
                {
                    key: "huguser",

                    prompt: "You can't exactly hug alone! Who are you hugging? Please ping the user.",

                    type: "string"
                }
            ],

            clientPermissions: ["SEND_MESSAGES"],

            description: "Hugs a user with a GIF.",

            group: "fun",

            guildOnly: true,

            memberName: "hug",

            name: "hug",

            throttling: {
                duration: 5,
                usages: 1
            }

        });
    }

    public async run(
        msg: commando.CommandoMessage,
        { huguser }: { huguser: string; }
    ): Promise<Message | Message[]> {
        if (msg.guild === null) return msg.reply("This command can only be used in guilds!");

        const member = await getMember(huguser, msg.guild);

        if (member === null)
            return msg.reply("mention a user!");

        const hugs = [
            "http://cadenkun.com/alice/hug/hug1.gif",
            "http://cadenkun.com/alice/hug/hug2.gif",
            "http://cadenkun.com/alice/hug/hug3.gif",
            "http://cadenkun.com/alice/hug/hug4.gif",
            "http://cadenkun.com/alice/hug/hug5.gif",
            "http://cadenkun.com/alice/hug/hug6.gif",
            "http://cadenkun.com/alice/hug/hug7.gif",
            "http://cadenkun.com/alice/hug/hug8.gif",
            "http://cadenkun.com/alice/hug/hug9.gif",
            "http://cadenkun.com/alice/hug/hug10.gif",
            "http://cadenkun.com/alice/hug/hug11.gif",
            "http://cadenkun.com/alice/hug/hug12.gif",
            "http://cadenkun.com/alice/hug/hug13.gif",
            "http://cadenkun.com/alice/hug/hug14.gif",
            "http://cadenkun.com/alice/hug/hug15.gif",
            "http://cadenkun.com/alice/hug/hug16.gif",
            "http://cadenkun.com/alice/hug/hug17.gif",
            "http://cadenkun.com/alice/hug/hug18.gif",
            "http://cadenkun.com/alice/hug/hug19.gif",
            "http://cadenkun.com/alice/hug/hug20.gif",
            "http://cadenkun.com/alice/hug/hug21.gif",
            "http://cadenkun.com/alice/hug/hug22.gif",
            "http://cadenkun.com/alice/hug/hug23.gif",
            "http://cadenkun.com/alice/hug/hug24.gif",
            "http://cadenkun.com/alice/hug/hug25.gif",
            "http://cadenkun.com/alice/hug/hug26.gif",
            "http://cadenkun.com/alice/hug/hug27.gif",
            "http://cadenkun.com/alice/hug/hug28.gif",
            "http://cadenkun.com/alice/hug/hug29.gif",
            "http://cadenkun.com/alice/hug/hug30.gif",
            "http://cadenkun.com/alice/hug/hug31.gif",
            "http://cadenkun.com/alice/hug/hug32.gif",
            "http://cadenkun.com/alice/hug/hug33.gif",
            "http://cadenkun.com/alice/hug/hug34.gif",
            "http://cadenkun.com/alice/hug/hug35.gif",
            "http://cadenkun.com/alice/hug/hug31.gif",
            "http://cadenkun.com/alice/hug/hug36.gif",
            "http://cadenkun.com/alice/hug/hug37.gif",
            "http://cadenkun.com/alice/hug/hug38.gif",
            "http://cadenkun.com/alice/hug/hug39.gif",
            "http://cadenkun.com/alice/hug/hug40.gif",
            "http://cadenkun.com/alice/hug/hug41.gif",
            "http://cadenkun.com/alice/hug/hug42.gif",
            "http://cadenkun.com/alice/hug/hug43.gif",
            "http://cadenkun.com/alice/hug/hug44.gif",
            "http://cadenkun.com/alice/hug/hug45.gif",
            "http://cadenkun.com/alice/hug/hug46.gif",
            "http://cadenkun.com/alice/hug/hug47.gif",
            "http://cadenkun.com/alice/hug/hug48.gif",
            "http://cadenkun.com/alice/hug/hug49.gif",
            "http://cadenkun.com/alice/hug/hug50.gif",
            "http://cadenkun.com/alice/hug/hug51.gif",
            "http://cadenkun.com/alice/hug/hug52.gif",
            "http://cadenkun.com/alice/hug/hug53.gif",
            "http://cadenkun.com/alice/hug/hug54.gif",
            "http://cadenkun.com/alice/hug/hug55.gif",
            "http://cadenkun.com/alice/hug/hug56.gif",
            "http://cadenkun.com/alice/hug/hug57.gif",
            "http://cadenkun.com/alice/hug/hug58.gif",
            "http://cadenkun.com/alice/hug/hug59.gif",
            "http://cadenkun.com/alice/hug/hug60.gif",
            "http://cadenkun.com/alice/hug/hug61.gif",
            "http://cadenkun.com/alice/hug/hug62.gif",
            "http://cadenkun.com/alice/hug/hug63.gif",
            "http://cadenkun.com/alice/hug/hug64.gif",
            "http://cadenkun.com/alice/hug/hug65.gif",
            "http://cadenkun.com/alice/hug/hug66.gif",
            "http://cadenkun.com/alice/hug/hug67.gif",
            "http://cadenkun.com/alice/hug/hug68.gif",
            "http://cadenkun.com/alice/hug/hug69.gif"


        ];

        const embed = new MessageEmbed()
            .setColor("#EFFF00")
            .setImage(hugs[Math.floor(Math.random() * hugs.length)])
            .setDescription(`${msg.author.toString()} has given ${member.toString()} a hug!`);
        return msg.channel.send(embed);

    }


}