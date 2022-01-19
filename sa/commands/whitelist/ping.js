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
// Creates a new class (being the command) extending off of the commando client
class PingCommand extends commando.Command {
    constructor(client) {
        super(client, {
            description: "PONG",
            group: "group1",
            memberName: "pong",
            name: "pong",
            ownerOnly: true,
            throttling: {
                duration: 5,
                usages: 3
            }
        });
    }
    // Now to run the actual command, the run() parameters need to be defiend (by types and names)
    async run(msg) {
        // Responds with whatever the user has said.
        // Return if null
        return msg.say("PONG 🏓");
    }
}
exports.default = PingCommand;
