"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    aliases: "name",
    cooldown: 5,
    description: "Displays your user tag",
    group: "Utility",
    name: "tag",
    // eslint-disable-next-line sort-keys
    async execute(message) {
        return message.channel.send(`Your tag is ${message.author.tag}`);
    }
};
