export function simpleSort(arr){

    function swap(a,b){
        const temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp; 
    }

    //Første iteration - bytter kun om på to tal men tjekker ikke med foreløbne tal
    /*for(let i = 1 ; i < arr.length ; i++){
        if(arr[i]>arr[i+1]){
            console.log(arr[i+1] + " er forkert placeret");
            swap(i,i+1);
            console.log(arr);
        }
    }*/

    for(let i = 1 ; i < arr.length ; i++){
        let j = i;
        while(arr[j]>arr[j+1]){
            console.log(arr[i+1] + " er forkert placeret");
            swap(j,j+1);
            //Vi skal fjerne 1 fra j, så den kan "finde en ny plads"
            j--;
            console.log(`${arr}`);
        }
    }

}