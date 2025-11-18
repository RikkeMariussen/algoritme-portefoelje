export function shuffle(arr){
    /*
    shuffle( arr )
        for i = to arr.length - 2
            j = random(i, arr.length-1)
            arr.swap( i, j)
    */

    //Finds j for second index 
    function random(i, arr){
        return Math.floor(Math.random()*(arr.length-i))+i;
    }

    //Swaps the numbers on the index i and j
    function swap(a,b){
        const temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;

    }

   for (let i = 0 ; i < arr.length-1 ; i++) {
    let j = random(i, arr);
    // Printing out the j's chosen: console.log(j);
    //swapping
    swap(i,j);
   }
   
}