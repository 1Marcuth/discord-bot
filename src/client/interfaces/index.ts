import discord from "discord.js"

interface IRegisterCommandOptions {
    guildId: string;
    commands: discord.ApplicationCommandDataResolvable[]
}

export { IRegisterCommandOptions }