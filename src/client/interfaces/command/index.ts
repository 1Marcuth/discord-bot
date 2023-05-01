import discord from "discord.js"

export interface IExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember
}

type IRun = (interaction: IExtendedInteraction) => Promise<any>

type ICommand = discord.ApplicationCommandData & {
    name: string
    description: string
    run: IRun
} & discord.ChatInputApplicationCommandData

export default ICommand