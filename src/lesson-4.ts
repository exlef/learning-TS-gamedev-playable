class Enemy {
    name: string;
    hp: number;
    readonly maxHealth : number; // readonly fields can only be set inside the constructor

    constructor(name: string, hp:number) {
        this.name = name;
        this.hp = hp;
        this.maxHealth = 100;
    }

    speak() : void {
        console.log("I am " + this.name + " name");
    }
}

// exercise
class Hero {
    private _health : number;
    public name : string;

    constructor(startHealth : number, name:string) {
        this._health = startHealth;
        this.name = name;
    }
    // overall safer approach. "this" keyword will always refer to the instance of this class. trade of might be the performance, especially if we are going to create a lot of instances of this class
    reportStatus = () : void => {
        console.log("my name is " + this.name + " and my health is " + this._health);
    }
    // "this" might not refer to the instance of the class if we pass this function as a callback to another function. The context might be lost, and we might get a bug. But this way we won't have a copy of this function for every instance of this class, so it might be more performant if we create a lot of instances from the class.
    reportStatus2():void {
        console.log("2: my name is " + this.name + " and my health is " + this._health);
    }
}

const hero = new Hero(10, "link");
hero.reportStatus();
hero.reportStatus2();