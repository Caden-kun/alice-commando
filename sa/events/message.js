"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function onMessage(msg) {
    if (msg.channel.id !== "800723694858141698")
        return;
    await msg.delete({
        reason: "Not a number from 1 - 5",
        timeout: 500
    });
    switch (msg.content) {
        case "1": {
            let author = msg.author.id;
            if (author.includes("#")) {
                const replace = new RegExp("#", "g");
                author = author.replace(replace, "");
            }
            let chName = `bug report ${author}`;
            chName = chName.split(" ").join("-").toLowerCase();
            if (msg.guild === null)
                return;
            if (msg.guild.channels.cache.some((ch) => ch.name === chName))
                return msg.author.send(`You already have a channel named #${chName}`).catch((err) => void console.log(err));
            const channel = await msg.guild.channels.create(chName, {
                permissionOverwrites: [{
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                        id: msg.author.id
                    }],
                topic: `${msg.author.tag} - Created at ${msg.createdAt}`
            });
            console.log(channel.name);
            return channel.send(`${msg.author} has opened a Bug Report ticket!\n`
                + "Welcome, please wait for the support team to get back to you.");
        }
        case "2": {
            let author = msg.author.id;
            if (author.includes("#")) {
                const replace = new RegExp("#", "g");
                author = author.replace(replace, "");
            }
            let chName = `exploit report ${author}`;
            chName = chName.split(" ").join("-").toLowerCase();
            if (msg.guild === null)
                return;
            if (msg.guild.channels.cache.some((ch) => ch.name === chName))
                return msg.author.send(`You already have a channel named #${chName}`).catch((err) => void console.log(err));
            const channel = await msg.guild.channels.create(chName, {
                permissionOverwrites: [{
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                        id: msg.author.id
                    }],
                topic: `${msg.author.tag} - Created at ${msg.createdAt}`
            });
            console.log(channel.name);
            return channel.send(`${msg.author} has opened a Bot Exploit ticket! \n`
                + "Welcome, please wait for the support team to get back to you.");
        }
        case "3": {
            let author = msg.author.id;
            if (author.includes("#")) {
                const replace = new RegExp("#", "g");
                author = author.replace(replace, "");
            }
            let chName = `inquiries ${author}`;
            chName = chName.split(" ").join("-").toLowerCase();
            if (msg.guild === null)
                return;
            if (msg.guild.channels.cache.some((ch) => ch.name === chName))
                return msg.author.send(`You already have a channel named #${chName}`).catch((err) => void console.log(err));
            const channel = await msg.guild.channels.create(chName, {
                permissionOverwrites: [{
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                        id: msg.author.id
                    }],
                topic: `${msg.author.tag} - Created at ${msg.createdAt}`
            });
            console.log(channel.name);
            return channel.send(`${msg.author} has opened a Bot Inquiries ticket! \n`
                + "Welcome, please wait for the support team to get back to you.");
        }
        case "4": {
            if (msg.guild === null)
                return;
            const botupdates = await msg.guild.roles.fetch("849937666942566420");
            if (botupdates === null)
                throw new Error("There was an internal Error, check that the roles are correct!");
            if (msg.member === null)
                return;
            if (msg.member.roles.cache.some((r) => r.name === botupdates.name)) {
                void msg.member.roles.remove(botupdates);
                return msg.author.send(`You have been removed from the role \`${botupdates.name}\`\n\n` +
                    " You will no longer be notified for any new bot updates.").catch((err) => void console.log(err));
            }
            void msg.member.roles.add(botupdates);
            return msg.author.send(`You have been given the \`${botupdates.name}\` role!\n\n You will not`
                + " be notified for any new bot updates!").catch((err) => void console.log(err));
        }
        case "5": {
            if (msg.guild === null)
                return;
            const botupdates = await msg.guild.roles.fetch("849937611538563074");
            if (msg.member === null)
                return;
            if (botupdates === null)
                throw new Error("There was an internal Error, check that the roles are correct!");
            if (msg.member.roles.cache.some((r) => r.name === botupdates.name)) {
                void msg.member.roles.remove(botupdates);
                return msg.author.send(`You have been removed from the role \`${botupdates.name}\`\n\n` +
                    " You will no longer be notified for any bot outages").catch((err) => void console.log(err));
            }
            void msg.member.roles.add(botupdates);
            return msg.author.send(`You have been given the \`${botupdates.name}\` role!\n\n You will now`
                + " be notified for any bot outages!").catch((err) => void console.log(err));
        }
        case "6": {
            let author = msg.author.id;
            if (author.includes("#")) {
                const replace = new RegExp("#", "g");
                author = author.replace(replace, "");
            }
            let chName = `appeal ${author}`;
            chName = chName.split(" ").join("-").toLowerCase();
            if (msg.guild === null)
                return;
            if (msg.guild.channels.cache.some((ch) => ch.name === chName))
                return msg.author.send(`You already have a channel named #${chName}`).catch((err) => void console.log(err));
            const channel = await msg.guild.channels.create(chName, {
                permissionOverwrites: [{
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                        id: msg.author.id
                    }],
                topic: `${msg.author.tag} - Created at ${msg.createdAt}`
            });
            console.log(channel.name);
            return channel.send(`${msg.author} has opened a Ban Appeal Ticket! \n`
                + "Welcome, please wait for the support team to get back to you.\n\n**Disclaimer:"
                + " Ban Appeals are NOT guaranteed to be accepted.**");
        }
    }
}
exports.onMessage = onMessage;
