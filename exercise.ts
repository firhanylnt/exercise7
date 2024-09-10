// exercise 1
function checkObject(obj1: any, obj2: any) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if(keys1.length !== keys2.length){
        return false;
    }
    
    for (let key of keys1) {
        console.log(key);
        console.log(obj1[key] , obj2[key])
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}

console.log(checkObject({ a: 2 }, { a: 1 }));
console.log(checkObject({ a: "Hello" }, { a: 1 }));
console.log(checkObject({ a: 1 }, { a: 1 }));
console.log(checkObject({a: 1, b: 5}, {}));


// exercise 2
function getIntersection(obj1: any, obj2: any) {
    const intersection: any = {};

    for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
            if(obj2[key] === obj1[key]){
                console.log(obj1[key],obj2[key])
                intersection[key] = obj1[key];
            }
        }
    }
    return intersection;
}

console.log(getIntersection({ a: 1, b: 2 }, { a: 1, c: 3 }));
console.log(getIntersection({ a: 1, b: 2 }, { d: 1, a: 3 }));
console.log(getIntersection({ name: 'firhan', b: 2 }, { name: 'firhan', c: 3 }));


// exercise 3
interface Student {
    name: string;
    email: string;
}

function mergeAndRemove(arr1: Student[], arr2: Student[]) {
    const mergeArray = [...arr1, ...arr2];
    
    const res = mergeArray.filter((student, index, arr) => 
        index === arr.findIndex((s) => s.email === student.email && s.name === student.name)
    );
    
    return res;
}

const array1: Student[] = [
    { name: 'Student 1', email: 'student1@mail.com' }, 
    { name: 'Student 2', email: 'student2@mail.com' }
];

const array2: Student[] = [
    { name: 'Student 1', email: 'student1@mail.com' }, 
    { name: 'Student 3', email: 'student3@mail.com' }
];

const result = mergeAndRemove(array1, array2);
console.log(result);

// exercise 4
interface IObject {
    [key: string]: any;
}

function switchObjectValue(input: IObject[]) {
    return input.map(obj => {
        let objValues: IObject = {};
        for (let key in obj) {
            objValues[obj[key]] = key;
        }
        return objValues;
    });
}

const inputArray: IObject[] = [{ name: 'David', age: 20, gender: 'male' }];
const res = switchObjectValue(inputArray);
console.log(res);

// exercise 5
let inputNumber: number = 5;
let total: number = 1;
let _res: string = `${inputNumber}! -> `;

for (let i = inputNumber; i > 0; i--) {
    total *= i;
    _res += i === 1 ? `${i} = ${total}` : `${i} x `;
}

console.log(_res);

// exersice 6 - Shooting Game
interface IPlayer {
    name: string;
    health: number;
    power: number;
    hit: (power: number) => void;
    useItem: (item: { health: number; power: number; }) => void;
    showStatus: () => any;
}

class Players implements IPlayer {
    name;
    health = 100;
    power = 0;
    constructor(paramName: string){
        this.name = paramName;
    }

    hit(power: number) {
        this.health -= power;
    }

    useItem(item: {health: number, power: number}){
        this.health += item.health;
        this.power += item.power;
    }

    showStatus() {
        return(`Player ${this.name} (Health => ${this.health}, Power => ${this.power})`);
    }
}


class ShootingGame {
    players: IPlayer[] = [];
    constructor(player1 : IPlayer, player2: IPlayer){
        this.players.push(player1, player2);
    }

    getRandomItem() {
        return {
            health: Math.random() < 0.9 ? 0 : 10,
            power: Math.random() < 0.9 ? 0 : 10,
        };
    }

    start() {
        let playerIndex = 0;
        while(this.players[0].health > 0 && this.players[1].health > 0) {
            const player1 = this.players[playerIndex];
            const player2 = this.players[(playerIndex + 1) % 2];

            player1.showStatus();
            player2.showStatus();

            player1.useItem(this.getRandomItem())
            player2.useItem(this.getRandomItem())

            player2.hit(player1.power);

            player1.showStatus();
            player2.showStatus();

            playerIndex = (playerIndex +1) % 2;
        }
        
        const winner = this.players[0].health > this.players[1].health ? this.players[0].name : this.players[1].name;
        this.players = [];
        return(`The winner is: ${winner}!`);
    }


}
const player1 = new Players('firhan')
const player2 = new Players('dimas')

const game = new ShootingGame(player1, player2);
console.log(game.start())
