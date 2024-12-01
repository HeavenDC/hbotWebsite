import express, { Application, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import { serverConfig } from './configs/serverConfig';
import DiscordRoutes from './api/discordRoutes';
import { UserAPI } from './bot/api/UserAPI';
import { Scope, Strategy } from 'passport-discord-auth';
import passport from 'passport';
import AuthRoutes from './api/authRoutes';
import { botConfig } from './configs/botConfig';
import './auth';

const app: Application = express();

app.use(
    session({
        secret: serverConfig.sessionSecret, // Une clé secrète pour sécuriser les sessions
        resave: false, // Ne pas enregistrer de session non modifiée
        saveUninitialized: false, // Ne pas sauvegarder de session non initialisée
        cookie: {
            secure: false, // Ne pas utiliser de cookies sécurisés
            maxAge: 24 * 60 * 60 * 1000, // Durée de vie de 24 heures pour les cookies de session
        },
    })
);

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', AuthRoutes)
app.use('/api', DiscordRoutes);
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use((req: any, res: any, next: NextFunction) => {
    if (serverConfig.maintenance) {
        if (req.isAuthenticated() && botConfig.botOwners.includes(req.user.id)) {
            return next();
        } else {
            return res.render('maintenance');
        }
    }

    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.get('/', async (req, res) => {
    const ownerIds = [
        '716639931610562563',
        '149552169467510784',
        '684762911373000716',
    ];

    const users = await Promise.all(
        ownerIds.map(async (id) => {
            const user = await UserAPI.getUser(id);
            var status = await UserAPI.getStatus(id);
            if (!user) return null;

            return {
                id,
                status: status,
                username: user.username,
                avatarUrl: user.avatar
                    ? `https://cdn.discordapp.com/avatars/${id}/${user.avatar}.png?size=1024`
                    : `https://cdn.discordapp.com/embed/avatars/${parseInt(id) % 5}.png`
            };
        })
    );

    if (req.isAuthenticated()) {
        const user = req.user as any;
        res.render('index', {
            users: users,
            isAuthenticated: true,
            username: user.username,
            avatarUrl: user.avatar
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`
                : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.id) % 5}.png`,
        });
    } else {
        res.render('index', { isAuthenticated: false, users: users });
    }
});

app.get('/maintenance', (req, res) => {
    res.status(503).render('maintenance');
});

app.get('/discord', (req, res) => {
    res.redirect('https://discord.gg/SfQ6AxVrbe');
});

async function startServer() {
    app.listen(serverConfig.port, () => {
        console.log(`Server is running on port ${serverConfig.port}`);
    });
}

startServer();