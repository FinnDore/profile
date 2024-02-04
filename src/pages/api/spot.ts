const spot = async () => {
    return Response.json(
        await (await fetch('https://spot.finndore.dev', {})).json()
    );
};

export default spot;

export const config = {
    runtime: 'experimental-edge'
};
