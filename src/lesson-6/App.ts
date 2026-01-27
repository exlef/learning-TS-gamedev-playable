import {add, PI} from './MathUtils'

const calculateCircle = (radius:number):number =>{
    return add(radius, radius) * PI;
}

console.log(calculateCircle(10));