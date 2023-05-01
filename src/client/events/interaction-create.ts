import { Client } from "../index"

import { IExtendedInteraction } from "../interfaces/command"
import IEvent from "../interfaces/event"

export const event: IEvent = {
    name: "interactionCreate",
    type: "on",
    run: async (interaction: IExtendedInteraction) => {
        if (interaction.isChatInputCommand()) {
            const client = interaction.client as Client
            const command = client.commands.get(interaction.commandName)

            if (!command) {
                return await interaction.reply(`O commando \`/${interaction.commandName}\` não existe!`)
            }

            try {
                console.log(`> [client] Running the command '${interaction.commandName}'.`)
                command.run(interaction)
            } catch(error) {
                console.error(error)

                await interaction.reply({ content: `Ocorreu um erro ao tentar extecutar o comando \`${command.name}\`!` })
            }
        }
    }
}