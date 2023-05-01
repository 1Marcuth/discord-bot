import discord from "discord.js";

enum EventTypes {
    on,
    once,
    off
}

type IRun = (...args: any) => Promise<any>
type IEventTypes = keyof typeof EventTypes
type IEventNames = keyof discord.ClientEvents

export interface IEvent {
    name: IEventNames
    type: IEventTypes
    run: IRun
}

export default IEvent