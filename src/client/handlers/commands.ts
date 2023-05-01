import * as discord from "discord.js"
import path from "path"
import fs from "fs"

import { Client } from "../index"

import ICommand from "../interfaces/command/index"

export default async (client: Client) => {
    const commandsDirPath = path.join(__dirname, "../commands")
    const fileExtension = path.extname(__filename)

    fs.readdirSync(commandsDirPath)
        .filter(dir => fs.lstatSync(path.join(commandsDirPath, dir)).isDirectory())
        .forEach(dir => {
            const subFolder = path.join(commandsDirPath, dir)
            
            fs.readdirSync(subFolder)
                .filter(file => file.endsWith(fileExtension))
                .forEach(async (file) => {
                    const commandFilePath = path.join(subFolder, file)
                    const command = await importCommand(commandFilePath)

                    if (!command.name) {
                        throw new Error(`> [client-commands-handler-error] Not valid commmand name on: ${commandFilePath}`)
                    }

                    if (!command.run) {
                        throw new Error(`> [client-commands-handler-error] Not valid command run on: ${commandFilePath}`)
                    }

                    loadCommand(command)

                    function loadCommand(command: ICommand) {
                        const commandData: discord.ApplicationCommandDataResolvable = {
                            name: command.name,
                            description: command.description,
                            type: command.type,
                            options: command.options
                        }

                        client.commands.set(command.name, command)
                        client.slashCommands.push(commandData)

                        console.log(`> [client] The command '${command.name}' loaded.`)
                    }
                })
        })

    async function importCommand(commandFilePath: string) {
        const command: ICommand = (await import(commandFilePath)).command
        return command
    }
}