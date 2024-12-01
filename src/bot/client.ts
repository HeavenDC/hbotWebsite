import { Client, GatewayIntentBits } from 'discord.js';
import { botConfig } from '../configs/botConfig';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent
    ]
});

client.login(botConfig.token)
    .then(() => {
        console.log('Bot is online!');
    })
    .catch((error) => {
        console.error('Error logging in to Discord:', error);
    });

export default client;