// This is a "raw" object. It has no strict type yet.
const player = {
    id: 1,
    name: "hero",
    hp: 100
};

// definition
interface PlayerData {
    id: number;
    name: string;
    hp: number;
}
// application
const p1 : PlayerData = {
    id: 1,
    name: "Hero",
    hp: 100,
};

interface ButtonConfig {
    text: string;
    color: string;
    icon?: string; // <--- This is optional
}
// Valid! Has icon
const btn1 : ButtonConfig = {text:"button1", color:"red", icon:"button.png"};
// ALSO Valid! No icon
const btn2 : ButtonConfig = {text:"button2", color:"green"}

// array of objects
const players : PlayerData[] = [p1, {id: 1, name: "player", hp: 100}];

//exercise 👇
interface Item {
    id: number,
    name: string,
    cost: number,
    description?: string
};

const shopItems : Item[] = [
    {id: 1, name: "Sword", cost: 50, description: "Sharp item"},
    {id:2, name: "Potion", cost : 10}
];