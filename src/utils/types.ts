/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection, Message, PermissionResolvable } from "discord.js";

export interface Collections {
    aliases: Collection<string, string>;
    commands: Collection<string, Commands>;
    cooldowns: Collection<string, Collection<string, number>>;
}

export interface Timestamp {
    timestamps: Collection<string, number>;
}

export interface Commands {
    aliases: string[];
    command: any;
    cooldown: number;
    description: string;
    devOnly: boolean;
    group: string;
    guildOnly: boolean;
    name: string;
    permissions: PermissionResolvable[] | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    premium: any;
    execute(message: Message, args: string[], col: Collections): void;
}