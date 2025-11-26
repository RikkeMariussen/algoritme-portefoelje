//Shunting yard af Christoffer og Rikke, @author Rikke Mariussen og Christoffer Aaby Leisted


//Først laver vi de nødvendige datastrukturer
class Node{
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue{
    constructor() {
        this.head = null;
        this.tail = null;
    }

    //Taget fra tidligere queue klasse i datastrukturer porteføljet
    enqueue(data) {
        //Create new node at the end, with data from the argument
        const newNode = new Node(data);
        //Checking if the queue has a head - or it will be set as the head
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            //Linking the new tail with the code
            this.tail.next = newNode;
            this.tail = newNode;
        } 
    }

    //Taget fra tidligere queue klasse i datastrukturer porteføljet
    dequeue() {
        //Tilføjet tjek da det manglede fra tidligere klasse
        if(!this.head) {
            return null;
        }

        const removedNode = this.head.data;
        //Overrides this head to be the next node.
        this.head = this.head.next;
        //returns removed node
        return removedNode; 
    }

    peek() {
        //Checking if there is a head
        return this.head ? this.head.data : null;
    }

    isEmpty() {
        return !this.head;
    }

}

class Stack{
    constructor(){
        this.head = null;
        //Vi er ligeglade med tail ved stack, da vi bare fjerner fra toppen af
    }

    push(data) {
        const node = new Node(data);
        node.next = this.head;
        this.head = node;
    }

    pop(){
        if ( !this.head ){
            return null;
        }
        const data = this.head.data;
        this.head = this.head.next;
        //Returnere det fjernets elements værdi
        return data;
    }

    peek() {
        //Checking if there is a head and returning the value
        return this.head ? this.head.data : null;
    }

    isEmpty() {
        return !this.head;
    }
}

//Nu skal vi definere hvilke operatorer vi bruger, og hvordan de skal indgå i udregningen (fra venstre til højre eller omvendt)
//Præcedents bruges til infix udregninger, aka hvad der jf. konventioner skal udregnes først. Hvor associativity bruges til postfix, hvor man udregner i forhold til rækkefølgen
const operators = {
    "+": {precedence: 1, associativity: "left" },
    "-": {precedence: 1, associativity: "left" },
    "*": {precedence: 2, associativity: "left" },
    "/": {precedence: 2, associativity: "left" },
    "^": {precedence: 3, associativity: "right" }
    // Parenteser medtages ikke som operationer men som tokens længere nede - da det ikke som sådan er en operation, men noget der incaser "et lille regnestykke"
};

//Nu skal vi gøre så det følger shunting yard algoritmen i stedet for de regneregler man lærer i folkeskolen 
function infixToPostfix(expression) {
    //En kø til regnestykket der gives
    const inputQueue = new Queue();
    //En kø til regnestykket i den rækkefølge det skal udregnes i forhold til shunting yard
    const outputQueue = new Queue();
    //En stak til de operatører der skal bruges
    const operatorStack = new Stack();

    //Først køres regnestykket igennem en split så det omtales i tokens (enkelte dele af stykket)
    const splitted = expression.split(" ");
    for (const val of splitted){
        if(isNaN(val)) {
            inputQueue.enqueue(val);
        } else {
            inputQueue.dequeue(val);
        }
    }

    //Dernæst skal det igennem Shunting Yard loop'et som kigger på præcedens og associativitet
    //Sålænge køen ikke er tom:
    while (!inputQueue.isEmpty()) {
        //Så først fjerner man det pågældende token fra inputkøen
        let token = inputQueue.dequeue();
        //Hvis det er et nummer så puttes det i outputkøen
        if(!isNaN(token)) {
            outputQueue.enqueue(token);
            //Ellers skal man se om token "" findes i operatører (altså om det er () eller ej)
        } else if (token in operators){ 
            //Nu skal vi gennemgå stacken for operatører og se om det er tomt, og ellers hvad hovedet er.
            while(
                //In operators tjekker om det pågældende hovedet i stacken er en operator
                !operatorStack.isEmpty() && operatorStack.peek() in operators &&
                //Vi skal se om præcedensen for ^ er højere end det foregående, fordi den er højre associateret, og skal således udregnes først, og hvis der er en ^ i forvejen skal man sikre at man tager den rigtige først
                ((token != "^" && operators[token].precedence <= operators[operatorStack.peek()].precedence) ||
                (token == "^" && operators[token].precedence < operators[operatorStack.peek()].precedence))
            ) {
                //Såfremt alle && er opfyldt, skal vi poppe hovedet, da det er dens "tur"
                outputQueue.enqueue(operatorStack.pop());
            }
            //Når vi er færdige med at poppe i loopet skal vi pushe det nye token som head¨
            operatorStack.push(token);
            //Hvis der er tale om ( skal den bare pushes, fordi den ikke har præcedens
        } else if (token == "(") {
            operatorStack.push(token);
        }  else if (token == ")") {
            //Hvis der er tale om ) skal man tjekke om stacken er tom (burde den ikke være pga "(" ) + og den næste operator IKKE er "(", da man typisk ikke bare har () rundt om et tal uden en operator ie. 5+6-(27)
            while (!operatorStack.isEmpty() && operatorStack.peek() != "(") {
                //Man fjerner det næste element fra output køen, indtil ovenstående ikke længere er sandt 
                outputQueue.enqueue(operatorStack.pop());
            }
            //Man fjerner det seneste element fra operator stacken
            operatorStack.pop();
        }
    }

    //Endvidere skal vi tømme resten af operatorStack indtil den er tom, ved at få det over i outputkøen i den rigtige rækkefølge
    while(!operatorStack.isEmpty()) {
        outputQueue.enqueue(operatorStack.pop());
    }

    //Konverter outputQueue til string så det kan indsættes i maskinen korrekt
    let result = "";
 
    //Vi skal blive ved med at tilføje elementerne indtil outputkøen er tom
    while(!outputQueue.isEmpty()){
        //Vi skal huske at fjerne elementet når vi har tilføjet det til stringen, hvorfor det er vi tidligere i queue sørgede for at returnere den fjernede værdi
        result += outputQueue.dequeue() + " ";
    }

    //Nu skal vi bare trimme det og returnere det en string som er gået fra infix til postfix
    return result.trim();
}

//Gået ud fra RPN calc fra klassen, med ændringer så det er to funktioner, hvor rpncalc har gothrough osv. inde i sig.
function rpncalc(expression){
const inputQueue = new Queue();
const resultStack = new Stack();


    //Vi har sat parsing Expression ind i metoden med rpncalc i stedet for sig selv --> Der læses en expression og putter den i inputQueue 
    
    //Splitting expressions and operations - but they are still strings - and we want numbers to be numbers and operations to be string
    const splitted = expression.split(" ");
    
    //Looking through each value
    for(const val of splitted) {
        if(isNaN(val)){
            //val er en operation
            inputQueue.enqueue(val);
        } else {
            inputQueue.enqueue(Number(val));
        }
    }

    //Vi har sat goThroughQueue ind i metoden med rpncalc i stedet for sig selv --> goThroughQueue går gennem køen og finder tal og operationer
   
    //Så længe der er noget i køen.. så skal vi i gennem loopet
    while(!inputQueue.isEmpty()) {
        //dequeue element fra køen
        let val = inputQueue.dequeue();
        //hvis det er et number:
        if(!isNaN(val)) {
            //push det til resultStack
            resultStack.push(val);
        //Ellers er det en operation
        } else { 
            //Så kald performOperation med den
            performOperation(val, resultStack);
        }
    }
    
    return resultStack.pop();
}


// performOperation udfører en bestemt operation
function performOperation (operation, stack) {
    //pop de sidste to værdier fra resultStack til A og B
    let a = stack.pop();
    let b = stack.pop();

    // Hvis operation == + --> læg A og B sammen, push resultatet til resultstack
    if(operation == "+") {
        stack.push(Number(a+b));
    } else if(operation == "-") {
        stack.push(Number(a-b));
    } else if(operation == "*") {
        stack.push(Number(a*b));
    } else if(operation == "/") {
        stack.push(Number(a/b));
    } else if(operation == "^") {
        stack.push(Number(a**b));
    }  

}

//Samlet funktionerne med infixToPostfix og rpncalc og printer resultatet
function calculate ( expression ) {
    const result = rpncalc(infixToPostfix(expression));
    console.log("Result: "+ result);
    return result;
}

//Man tester ved at kalde calculate("ens udregning"); HUSK MELLEMRUM
//Vi har testet med opgaverne fra torsdag den 13. nov., undtagen kvadratsrods opgaven. 
calculate("85 - 31");
console.log("Postfix:" + infixToPostfix("85 - 31")); 
calculate("3 + 4 * ( 5 - 2 )"); 
console.log("Postfix:" + infixToPostfix("3 + 4 * ( 5 - 2 )"));
calculate("( 5 + 9 ) / 4"); 
console.log("Postfix:" + infixToPostfix("( 5 + 9 ) / 4"));
calculate("( 12 + 3 ) * ( 7 + 9 )"); 
console.log("Postfix:" + infixToPostfix("( 12 + 3 ) * ( 7 + 9 )"));
calculate("23 ^ 2 - ( 13 * 9 ) + ( 5 / 7 )"); 
console.log("Postfix:" + infixToPostfix("23 ^ 2 - ( 13 * 9 ) + ( 5 / 7 )"));
calculate("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3"); 
console.log("Postfix:" + infixToPostfix("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3"));

//node shuntindyard.js 