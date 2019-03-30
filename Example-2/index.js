let rect = require('./rectangle')

let rectfunc = (l,b) => {
    rect(l,b,(err,result) => {
        if(err){
            console.log(`Error is: ${err.message}`);
        }else{
            console.log(`Perimeter = ${result.perimeter()}`);
            console.log(`Area = ${result.area()}`);
        }
    });
}

rectfunc(2,3);
rectfunc(3,4);
rectfunc(-1,-3);