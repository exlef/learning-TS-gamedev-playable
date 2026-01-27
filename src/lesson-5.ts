// arrow function
const spawnSequence = async() : Promise<void> => {
    console.log("spawn")
}

// standard function
async function spawnSequenceStandardFunction() : Promise<void>{
    console.log("spawn")
}

// the helper "wait" function
const wait = (seconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

const runGameLoop = async () : Promise<void> => {
    console.log("game starting");

    await wait(2.0);

    console.log("Wave 1 is spawning");

    await wait(1.0);

    console.log("go");
}

class TrafficLight
{
    startCycle = async () : Promise<void> => {
        console.log("green light");
        await wait(3.0);
        console.log("yellow light");
        await wait(1.0);
        console.log("red light");
    }
}

// since we can't use the await outside of the functions in the files are not modules, we crated this "main" function
const main = async () : Promise<void> => {
    const trafficLight = new TrafficLight();
    await trafficLight.startCycle();
    console.log("cycle finished, cars are moving");
}

main();
