import { isSorted } from "./issorted.js";
import { shuffle } from "./shuffle.js";


const arr1 =[1, 2, 3, 4, 5, 6, 7, 8, 9];
const arr2 = [1, 2, 4, 5, 7, 9, 11];
const arr3 = [2, 2, 3, 6, 8, 9, 9, 10, 10, 11, 12];
const arr4 = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const arr5 = [1, 8, 9, 4, 6, 7, 2, 5, 3];
const arr6 = [1, 2, 4, 4, 5, 3, 6, 7, 8];
const arr7 = [4, 4, 4, 4, 4, 4, 4];


console.log("Array 1: "+ isSorted(arr1));
console.log("Array 2: "+ isSorted(arr2));
console.log("Array 3: "+ isSorted(arr3));
console.log("Array 4: "+ isSorted(arr4));
console.log("Array 5: "+ isSorted(arr5));
console.log("Array 6: "+ isSorted(arr6));
console.log("Array 7: "+ isSorted(arr7));

shuffle(arr1);
console.log(arr1);
console.log("Array 1: "+ isSorted(arr1));
