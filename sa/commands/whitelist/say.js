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
class SayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            args: [
                {
                    key: "args1",
                    prompt: "Give me something good to say!",
                    type: "string"
                }
            ],
            clientPermissions: ["MANAGE_MESSAGES"],
            description: "I can say whatever the user wants!",
            group: "group1",
            guildOnly: true,
            memberName: "say",
            name: "say",
            throttling: {
                duration: 5,
                usages: 3
            }
        });
    }
    // Now to run the actual command, the run() parameters need to be defiend (by types and names)
    async run(msg, { args1 }) {
        // Deletes command usage
        void msg.delete();
        // Responds with whatever the user has said.
        return msg.say(args1);
    }
}
exports.default = SayCommand;
