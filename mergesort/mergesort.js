export function mergeSort(arr){
    //The task calls for 1 variable for the iterations, so index 0 is rekursion and index 1 is loops
   const iterations = [0,0];

   //Function to put two values next to eachother, they are called left and right, because we take one number from the left half of the array and the other one from the right side.  
   function merge(left,right){
    //An empty array to display the sorted array from input
    const result = [];
    //Two values that we compare to each other
    let i = 0;
    let j = 0;

    //As long as there are numbers in either half of the array (left or right), continue the loop.
    while(i<left.length || j<right.length) {
        //For each go through of the loop, index 1 increases with one
        iterations[1]++;

        //First we check if there is nothing left in the right half OR the number on the left is not 0 and the number on the left side is lower than the one on the right, we push the left - and the right stays for the next round
        if (j >= right.length || (i < left.length && left[i] < right[j])){
          result.push(left[i]);
          //As we just pushed i into the new array, we need to go one up in the array
          i++;
          //If neither of the above if is true, we will push the right side  
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result;
   }

   //Using the function merge to sort the given array
   function sort(arrayToSort){
    iterations[0]++;

    //Checking if the length of the given array is less or equal to 1, because then you just return the array and dont slice it
    if(arrayToSort.length <= 1) {
        return arrayToSort;
    }

    //Finding the middle, so we know where to slice
    const middle = Math.floor(arrayToSort.length/2);

    //Slicing the array so we have something to compare/merge
    const left = arrayToSort.slice(0, middle);
    const right = arrayToSort.slice(middle);

    //Returning the merge using the sort aka recursion happens, until there is nothing left to slice
    return merge(sort(left), sort(right));
   }

   //Sorting the given arr when the exported function is called, with recursion due to sort()
   const sortedArr = sort(arr);

   return {
    arr: sortedArr,
    iterations: {
        recursions: iterations[0],
        loops: iterations[1]
    },
    sorted: true,
   }
}