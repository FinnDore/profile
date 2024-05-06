import type { NextApiRequest, NextApiResponse } from "next";

const spot = async (_req: NextApiRequest, res: NextApiResponse) => {
  const spotRes = await fetch("https://spot.finndore.dev/top-songs", {});
  const spotData = await spotRes.json();
  res.status(200).json(spotData);
};

export default spot;
