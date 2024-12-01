import { Router } from 'express';
import { UserAPI } from '../bot/api/UserAPI';
import client from '../bot/client';

const router = Router();

router.get('/v1/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await UserAPI.getUser(id); // Récupérer l'utilisateur via l'API Discord

    if (user) {
        res.json({
            id: user.id,
            username: user.username
        });
    } else {
        res.status(404).send('User not found');
    }
});

router.get('/v1/avatar/:id', async (req, res) => {
    const { id } = req.params;
    const avatarUrl = await UserAPI.getAvatar(id); // Récupérer l'avatar via l'API Discord

    if (avatarUrl) {
        res.json({ avatarUrl });
    } else {
        res.status(404).send('Avatar not found');
    }
});

router.get('/v1/status/:id', async (req, res) => {
    const { id } = req.params;
    
    const user = await client.users.fetch(id);
    const member = (await client.guilds.fetch('1020405855277023273')).members.fetch(user);

    if (member) {
        res.json({
            status: (await member).presence?.status
        });
    } else {
        res.status(404).send('User not found');
    }

});

export default router;