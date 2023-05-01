import path from "path"
import fs from "fs"

import { Client } from "../index"

import IEvent from "../interfaces/event"

export default async (client: Client) => {
    const eventsDirPath = path.join(__dirname, "../events")
    const fileExtension = path.extname(__filename)

    fs.readdirSync(eventsDirPath)
        .filter(file => file.endsWith(fileExtension))
        .forEach(async (file) => {
            const eventFilePath = path.join(eventsDirPath, file)
            const event = await importEvent(eventFilePath)

            loadEvent(event)
            
            function loadEvent(event: IEvent) {
                switch (event.type) {
                    case "on":
                        client.on(event.name, (...args) => event.run(...args))
                        break
                    case "once":
                        client.once(event.name, (...args) => event.run(...args))
                        break
                    case "off":
                        client.off(event.name, (...args) => event.run(...args))
                        break
                    default:
                        throw new Error(`> [client-error] The value '${event.type}' that informed for the type of the event is invalid.`)
                }
                
                console.log(`> [client] The event '${event.name}' loaded.`)
            }
        })

    async function importEvent(eventFilePath: string) {
        const event: IEvent = (await import(eventFilePath)).event
        return event
    }
}