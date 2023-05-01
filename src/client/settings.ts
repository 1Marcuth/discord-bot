import dotenv from "dotenv"

dotenv.config()

const bot = {
    name: "Marcuth's butler",
    description: "Bot template made by Marcuth at https://github.com/1Marcuth",
    commands: {
        prefix: "/",
        optionsSeparator: ":"
    },
    token: process.env.BOT_TOKEN,
    admin: {
        id: ""
    },
    application: {
        id: "",
        publicKey: ""
    },
    webhook: {
        id: "",
        token: "",
        url: "",
        avatarUrl: ""
    }
}

export { bot }