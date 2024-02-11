const spot = async () => {
    console.log('INFO: Requesting current song');
    return new Response(
        await (await fetch('https://spot.finndore.dev')).text()
    );
};

export default spot;

export const config = {
    runtime: 'experimental-edge'
};
