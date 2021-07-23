import * as commando from "discord.js-commando";
import { Message, MessageEmbed } from "discord.js";
import { getMember } from "../../utils/getMember";

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
            "https://cdn.discordapp.com/attachments/857396944740286507/857431310117371914/hug1.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431312314662912/hug2.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431312641163284/hug3.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431324277342258/hug4.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431331205414952/hug5.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431331808739328/hug6.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431339141955604/hug7.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431341309886524/hug8.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431350583623720/hug9.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431356693545000/hug10.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431359307513866/hug11.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431374533230613/hug12.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431373236142090/hug13.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431377896013844/hug14.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431393860714496/hug15.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431394858696734/hug16.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431396293410856/hug17.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431415553916958/hug18.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431414772334612/hug19.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431417835487242/hug20.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431439204286514/hug21.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431438597161000/hug22.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431439955984394/hug23.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431463800602624/hug24.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431459747594310/hug25.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431462886113290/hug26.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431495908130826/hug27.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431492741562418/hug28.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431499183751228/hug29.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431509380104204/hug30.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431510151069726/hug31.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431512281382942/hug32.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431516257714196/hug33.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431519622463539/hug34.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431523984539678/hug35.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431531207262208/hug36.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431532523749376/hug37.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431532079939604/hug38.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431547069595698/hug39.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431554077491220/hug40.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431552500695070/hug41.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431551889113110/hug42.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431552819855361/hug43.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/857431572558905404/hug44.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527535766011944/hug45.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527550513053707/hug46.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527564337610772/hug47.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527575229038592/hug48.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527589573427240/hug49.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527601733500928/hug50.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527608128765962/hug51.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527619809902643/hug52.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527630963474482/hug53.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527644339765278/hug54.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527654333218856/hug55.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527684637851648/hug57.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527696256335893/hug58.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527705021775882/hug59.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527713381285899/hug60.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527727734718514/hug61.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527739780628491/hug62.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527748139352064/hug63.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527756489818143/hug64.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527764324515870/hug65.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527778145402880/hug66.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527787301306411/hug68.gif",
            "https://cdn.discordapp.com/attachments/857396944740286507/863527798878240768/hug69.gif"
        ];

        const embed = new MessageEmbed()
            .setColor("#EFFF00")
            .setImage(hugs[Math.floor(Math.random() * hugs.length)])
            .setDescription(`${msg.author.toString()} has given ${member.toString()} a hug!`);
        return msg.channel.send(embed);

    }


}