let rect = require('./rect.js');

let fun = (l,b) => {
    console.log(`Perimeter = ${rect.perimeter(l,b)}`);
    console.log(`Area= ${rect.area(l,b)}`);
}

fun(2,3);
fun(4,5);