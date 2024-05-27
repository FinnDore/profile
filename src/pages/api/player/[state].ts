import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../env/server.mjs";
import { getServerAuthSession } from "../auth/[...nextauth]";

const player = async (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof req.query.state !== "string") {
        res.status(400).json({ error: "Invalid state" });
        return;
    }

    const session = await getServerAuthSession({
        req,
        res,
    });

    if (!session?.user.verified) return res.status(401).end();

    console.log(`INFO: changing player state ${req.query.state}`);
    const spotResponse = await fetch(
        `https://spot.finndore.dev/player/${encodeURIComponent(req.query.state)}`,
        {
            method: "post",
            headers: {
                authorization: env.EXTERNAL_AUTH_TOKEN,
            },
        },
    );
    if (spotResponse.status !== 200) {
        console.log("error: ", spotResponse.statusText);
        res.status(500).end();
    } else {
        res.status(200).end();
    }
};

export default player;
