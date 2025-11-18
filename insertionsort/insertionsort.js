export function insertionSort(arr){

    function swap(a,b){
        const temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp; 
    }

    //Insertion sorting implementing swap
    for(let i = 1 ; i < arr.length ; i++){
        let j = i;
        while(arr[j]>arr[j+1]){
            console.log(arr[i+1] + " er forkert placeret");
            swap(j,j+1);
            j--;
            console.log(`${arr}`);
        }
    }

}