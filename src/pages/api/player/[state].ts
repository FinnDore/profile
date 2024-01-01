import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';

const player = async (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof req.query.state !== 'string') {
        res.status(400).json({ error: 'Invalid state' });
        return;
    }

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
