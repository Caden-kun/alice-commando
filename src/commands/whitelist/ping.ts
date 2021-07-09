import * as commando from "discord.js-commando";
import { Message } from "discord.js";

// Creates a new class (being the command) extending off of the commando client
export default class PingCommand extends commando.Command {
    public constructor(client: commando.CommandoClient) {
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
    public async run(
        msg: commando.CommandoMessage
    ): Promise<Message | Message[]> {
    // Responds with whatever the user has said.
    // Return if null
        return msg.say("PONG 🏓");
    }
}
