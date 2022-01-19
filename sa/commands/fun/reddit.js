"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commando = __importStar(require("discord.js-commando"));
const discord_js_1 = require("discord.js");
const random_bunny_1 = require("random-bunny");
class RedditCommand extends commando.Command {
    constructor(client) {
        super(client, {
            args: [
                {
                    key: "subreddit",
                    prompt: "Please choose a subreddit! \n(Please note, subreddits are case sensitive.)",
                    type: "string"
                }
            ],
            description: "Commando subreddit command.",
            group: "fun",
            guildOnly: true,
            memberName: "reddit",
            name: "reddit",
            throttling: {
                duration: 60,
                usages: 1
            },
            userPermissions: ["MANAGE_GUILD"]
        });
    }
    async run(msg, { subreddit }) {
        return random_bunny_1.randomBunny(`${subreddit}`, "top", async (res) => {
            console.log(`${res.title}: ${res.url}`);
            const loading = new discord_js_1.MessageEmbed()
                .setTitle("Please wait...")
                .setDescription("<a:AH_LoAding:776776118401368064> Loading image...");
            const loaded = new discord_js_1.MessageEmbed()
                .setColor("#EFFF00")
                .setImage(res.url)
                .setTitle(res.title)
                .setDescription(`From [r/${subreddit}](https://reddit.com/r/${subreddit})`)
                .setTimestamp();
            const m = await msg.channel.send(loading);
            return m.edit(loaded);
        });
    }
}
exports.default = RedditCommand;
