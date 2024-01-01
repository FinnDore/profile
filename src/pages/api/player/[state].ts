import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';
import { getServerAuthSession } from '../auth/[...nextauth]';

const player = async (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof req.query.state !== 'string') {
        res.status(400).json({ error: 'Invalid state' });
        return;
    }

    const session = await getServerAuthSession({
        req,
        res
    });
    console.log(session);
    if (!session.user.verified) return res.status(401).end();
    await fetch(
        `http://127.0.0.1:3001/player/${encodeURIComponent(req.query.state)}`,
        {
            method: 'post',
            headers: {
                authorization: env.EXTERNAL_AUTH_TOKEN
            }
        }
    );
    res.status(200).end();
};

export default player;