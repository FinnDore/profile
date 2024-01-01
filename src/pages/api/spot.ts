import type { NextApiRequest, NextApiResponse } from 'next';

const spot = async (req: NextApiRequest, res: NextApiResponse) => {
    const spotRes = await fetch('http://127.0.0.1:3001', {});
    const spotData = await spotRes.json();
    res.status(200).json(spotData);
};

export default spot;
