import { Message } from "discord.js";

module.exports = {
    aliases: "name",
    cooldown: 5,
    description: "Displays your user tag",
    group: "Utility",
    name: "tag",
    // eslint-disable-next-line sort-keys
    async execute(message: Message): Promise<Message> {
        return message.channel.send(`Your tag is ${message.author.tag}`);
    }
};
