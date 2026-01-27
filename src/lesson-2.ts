// standard function
function run():void {
    console.log('run');
}

// arrow function
const jump = ():void => {
    console.log('jump');
}

// function example
const add = (a:number, b:number):number => {
    return a + b;
}

// String interpolation
const logScore = (score:number):void => {
    console.log(`Current Score: ${score}`);
    console.log("Current Score: " + score);
}

// exercise
const takeDamage = (currentHealth:number, damageAmount:number):number =>{
    let health = currentHealth - damageAmount;
    if(health < 0) return 0;
    return health;
}

console.log(takeDamage(100, 10));
console.log(takeDamage(10, 20));
