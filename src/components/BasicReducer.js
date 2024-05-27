import {useReducer} from "react"
import React from "react"


const reduktor = (state, action) => {
    switch(action.type) {
        case 'increment':
            return state + 2
        case 'decrement':
            return state - 2
        case 'reset':
            return 0
        default:
            throw new Error();
    }

}

export default function BasicReducer () {

    const [count, dispatch] = useReducer(reduktor, 3)

    const throttled = (fn, delay) => {
        let lastCall = 0;
        console.log(lastCall.toString().split("").slice(-2).join("")); // We see this console.log immediately after page has loaded
                                                                        // and only once after first page render
        return (...args) => {   
            console.log(lastCall.toString().split("").slice(-2).join(""));
            const now = new Date().getTime();

            if (now - lastCall < delay) {
                console.log("Klikam ale nie wysylam zapytania do serwera")
                return;
            }

            lastCall = now;
            console.log(lastCall.toString().split("").slice(-2).join("")); 
            return fn(...args);  
        }
    }


    const ttt = (x,y)=> {console.log(x+y)}

    
    return(
        <div>
        
            <h1>Prosty reducer, Stan obecny: {count}</h1>
            <button onClick={ () => dispatch('increment') }>Dodaj</button>
            <button onClick={ () => dispatch('decrement') }>Odejmij</button>
            <button onClick={ () => dispatch('reset') }>Zresetuj</button>
            <button onClick={throttled(()=> ttt(2,3), 4000)}>Throttle</button> 
            <hr />       {/* onClick={ throttled( (e)=> console.log(e.target.value, "Guzik klikniety") ), 3000 } */}
            
        </div>
    )
}

/*
A closure gives you access to an outer function's scope from an inner function. 
The closure preserves the outer scope inside its inner scope.
A closure is a function having access to the parent scope, even after the parent function has closed 
(parent function has already returned something).
Here we return childFunction instead of executing it like so: childFunction().
Normally, a local variable only exists during the execution of the function.It means that when the parentFunction 
has completed executing, the myValue variable is no longer accessible.
In this case, we execute the result() function that references the childFunction() , the "x" and "myValue" variables still exist.
In other words, the childFunction() is a closure.
*/
let x = 1;
const parentFunction = () => {

    let myValue = 2;
    console.log(x)  // has access to global scope

    const childFunction = () => {
        console.log(x+=5);         // ChildFunction has access to parent scope (x, myValue variables)
        console.log(myValue+=1)
        //return x;
}
    return childFunction;  //We dont use: childFunction() invocation, that happens inside of its lexical scope (the scope of parentFunc()).
                           // We want childFunction to be invoked outside of its lexical scope - in a function result().
}

const result = parentFunction(); // a variable "result" references the childFunction only, not the outer parentFunction
console.log(result); // shows code block of ChildFunction
result(); // 6, 3
result();  // 11, 4


// IIFE Immediately Invoked Function Expression

const privateCounter = ( () => {
    let count = 0;
    console.log(`Initial value: ${count}`);
    return () => {
        count +=1;
        console.log(count)
    }
} )(); // po immediately invoking widzimy tylko console.log(`Initial value: ${count}` bez returnu

privateCounter(); //bez tego wywolania funkcja wykonuje tylko console.log , ale nie zwraca tego co w return
privateCounter(); // dlatego wywolujemy privateCounter() i za kazdym wywolaniem otrzymamy count zwiekszony o 1
privateCounter();


//DECORATOR FUNCTION

let sum = (...args) => {
    console.log(args) // [2,3,5]
    return [...args].reduce((acc, num) => {
        return acc + num
    })
}

let callCaunter = (fn) => {
    let count = 0;
    return (...args) => {
        console.log(`Sum  has been called ${count += 1} times`);
        console.log(args) // [2,3,5]
        return fn(...args);
    }
}

sum = callCaunter(sum);
console.log(sum(2,3,5)); //10    i wszystkie console logi z obu funkcji. Gdybysmy skomentowali te linie to console logi nie pokaza sie


//Multiple Decorator function

let rectangleArea = (length, width) => {
    return length * width;
}


const countParams = (fn) => {
    return(...params) => {
        console.log(params); 
        if (params.length !== fn.length) {
            throw new Error(`Incorrect number of parameters of ${fn.name}`);
        }
        console.log(fn.name);
        return fn(...params);
    }
}

const reqireIntegers = (funk) => {
    console.log(funk.name);
    return(...params)=> {
        params.forEach(param => {
            if(!Number.isInteger(param)) {
                throw new TypeError(`Params for ${funk.name} must be integers.`);
            }
        })

        return funk(...params);
    }
}

rectangleArea = countParams(rectangleArea);
rectangleArea = reqireIntegers(rectangleArea);
console.log(rectangleArea(5,3));








