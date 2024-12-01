import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { botConfig } from './configs/botConfig';
import { serverConfig } from './configs/serverConfig';
import { Scope } from 'passport-discord-auth';

passport.use(
    new DiscordStrategy(
        {
            clientID: botConfig.botId || '',
            clientSecret: botConfig.botSecret || '',
            callbackURL: serverConfig.sessionRedirect || '',
            scope: [Scope.Identify, Scope.Guilds],
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user as Express.User);
});