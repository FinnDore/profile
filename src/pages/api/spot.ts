const spot = async () => {
    return new Response(
        await (await fetch('https://spot.finndore.dev', {})).text()
    );
};

export default spot;

export const config = {
    runtime: 'experimental-edge'
};
