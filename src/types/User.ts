export interface UserData {
    id: string;
    username: string;
    discriminator: string;
    bot: boolean;
}

export interface AvatarResponse {
    avatarUrl: string;
}