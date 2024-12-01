import { User } from 'discord.js';
import client from '../client'; // Utilisation du client Discord

export class UserAPI {
    // Récupère les informations de l'utilisateur via son ID
    static async getUser(id: string): Promise<User | null> {
        try {
            const user = await client.users.fetch(id);
            return user || null;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    // Récupère l'avatar de l'utilisateur via son ID
    static async getAvatar(id: string): Promise<string | null> {
        try {
            const user = await client.users.fetch(id);
            return user ? user.displayAvatarURL({ size: 1024 }) : null;
        } catch (error) {
            console.error('Error fetching avatar:', error);
            return null;
        }
    }

    static async getStatus(id: string): Promise<string> {
        try {
            const member = await client.guilds.cache.get('1020405855277023273')?.members.fetch(id);

            return member?.presence?.status || 'offline';
        } catch (error) {
            console.error('Error fetching status:', error);
            return 'offline';
        }
    }
}