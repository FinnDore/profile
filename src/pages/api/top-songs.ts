import type { NextApiRequest, NextApiResponse } from "next";

const spot = async (_req: NextApiRequest, res: NextApiResponse) => {
    const spotRes = await fetch("http://0.0.0.0:3001/top-songs", {});
    const spotData = await spotRes.json();
    res.status(200).json(spotData);
};

export default spot;
