//Den her mappe tilhører algoritmer

export function isSorted(arr){

    for(let i = 0 ; i < arr.length ; i++){
        if(arr[i]>arr[i+1]){
            return false;
        }
    } return true;

}

/*
Kommentarer til undervisning:
    !(arr[i-1]<=arr[i])


    Jeg havde lidt problemer med at lave selve arrayene, og så havde jeg skrevet for loop'et forkert fordi det kun kiggede på de to første, og det skal igennem hele loop'et, hvorfor man ikke skal returne noget hvis det ikke er false
    Peters:
function {
    for (let i = 1 ; i<arr.length ; i++) {
        if(arr[-1] > arr[i]) {
            return false;
        }
    
    }
    return true;
}
*/