"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const globals_1 = require("./utils/globals");
const discord_js_1 = require("discord.js");
const sqlite3_1 = require("sqlite3");
const commandRun_1 = require("./events/commandRun");
const onDelete_1 = require("./events/onDelete");
const guildCreate_1 = require("./events/guildCreate");
const guildDelete_1 = require("./events/guildDelete");
const message_1 = require("./events/message");
const ready_1 = require("./events/ready");
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
exports.col = {
    aliases: new discord_js_1.Collection(),
    commands: new discord_js_1.Collection(),
    cooldowns: new discord_js_1.Collection()
};
async function main() {
    const client = new discord_js_commando_1.Client({
        commandPrefix: globals_1.CONFIG.prefix,
        owner: globals_1.CONFIG.owners
    });
    // Runs the onReady function defined in ./events/ready
    client.on("ready", () => void ready_1.onReady(client));
    client.on("message", async (msg) => void message_1.onMessage(msg));
    client.on("guildCreate", (guild) => void guildCreate_1.onGuildCreate(client, guild));
    client.on("guildDelete", (guild) => void guildDelete_1.onGuildDelete(client, guild));
    client.on("commandRun", (cmd, _promise, msg) => void commandRun_1.onCommandRun(cmd, msg));
    client.on("messageDelete", (msg) => void onDelete_1.onDelete(msg));
    // Registers all groups/commands/etc
    client.registry.registerDefaultTypes()
        .registerGroups([
        ["group1", "first batch of commands"],
        ["fun", "fun commands"],
        ["utility", "useful commands"],
        ["moderation", "commands used to moderate servers"],
        ["logging", "commands used to set log channels"]
    ]).registerDefaultGroups()
        .registerDefaultCommands({
        unknownCommand: false
    })
        .registerCommandsIn(path_1.default.join(__dirname, "commands"));
    void sqlite_1.open({
        driver: sqlite3_1.Database,
        filename: path_1.default.join(__dirname, "../settings.sqlite3")
    }).then(async (db) => {
        await client.setProvider(new discord_js_commando_1.SQLiteProvider(db));
    });
    await client.login(globals_1.CONFIG.token);
}
main().catch(console.error);
