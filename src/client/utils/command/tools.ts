import { bot } from "../../settings"

function isBotOwerId(id: string) {
    return id === bot.admin.id
}

export { isBotOwerId }