let values = [];
    for(let i=1; i <= 100; i++) {
        values[i-1] = i;
      }


export function binarySearch( searchFor, values){
    console.log("Vi er i gang med at søge efter værdien");
    let min = 0;
    let max = values.length-1; 
    let middle = Math.floor(min+((max-min)/2));
    let iterations = 1;
    let found = false;
    console.log(`Min: ${min}, max: ${max}, middle: ${middle}, count: ${iterations}`);
   
    //Loop'et fortsætter kun hvis det både er falskt og der er flere muligheder tilbage
    while(!found && min<=max){
        if(searchFor < values[middle]){
            //Vi har kigget på middle, og den skal derfor ikke medtages i værdierne
            max = middle-1;
            middle = Math.floor(min+((max-min)/2));
            iterations++;
            console.log(`Min: ${min}, max: ${max}, middle: ${middle}, value: ${values[middle]}, count: ${iterations}`);
        } 
        else if (searchFor > values[middle]){
            //Vi har kigget på middle, og den skal derfor ikke medtages i værdierne
            min = middle+1;
            middle= Math.floor(min+((max-min)/2));
            iterations++;
            console.log(`Min: ${min}, max: ${max}, middle: ${middle}, value: ${values[middle]}, count: ${iterations}`);
        }
        else if (searchFor == values[middle]) {
            found = true;
        }
    }

    return { found, iterations, index: found?middle:-1 };
}

const result = binarySearch(25,values);
console.log("Found: " + result.found + ", Iterations: "+ result.iterations + ", Indexnumber:" + result.index);