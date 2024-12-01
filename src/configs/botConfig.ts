import { ActivityType, PresenceData } from "discord.js";

export const botConfig = {
    presence: {
        activities: [
            {
                name: 'le monde !',
                type: ActivityType.Watching
            }
        ],
        status: 'online'
    } as PresenceData,

    betaGuilds: ['1020405855277023273'],
    botOwners: ['716639931610562563', '149552169467510784'],

    botId: '1211584436634910761',
    botSecret: '',

    token: ''
}