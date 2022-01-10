"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("quick.db"));
const globals_1 = require("../utils/globals");
const discord_js_1 = require("discord.js");
async function onCommandRun(cmd, msg) {
    let desc = `User: ${msg.author} - ${msg.author.tag}\nServer ID: ${msg.guild?.id}\nServer Name: ${msg.guild?.name}`;
    if (msg.channel.type === "dm")
        desc = `User: ${msg.author} - ${msg.author.tag}`;
    db.add(`${cmd.name}`, 1);
    const botlogevent = new discord_js_1.MessageEmbed()
        .setTitle(msg.channel.type === "dm" ? `Command used: ${cmd.name} (DM)` : `Command used: ${cmd.name}`)
        .setDescription(desc)
        .setColor(globals_1.CONFIG.colours.yellow)
        .setTimestamp();
    const botlogserver = await msg.client.guilds.fetch(globals_1.STORAGE.botlogserver);
    const botlog = botlogserver.channels.cache.get(globals_1.STORAGE.botlogchannel);
    return botlog.send(botlogevent);
}
exports.onCommandRun = onCommandRun;
