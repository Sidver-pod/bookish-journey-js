var obj = {num : 10};

var x = function(a, b, c){
  return this.num + a + b + c;
};

console.log(x.call(obj, 1, 2, 3)); //call

var arr = [1, 2, 3];
console.log(x.apply(obj, arr)); //apply

var bound = x.bind(obj);
console.log(bound(1, 2, 3));

//4)
var student = {age:20};

function readAge(){
  console.log(`AGE: ${this.age}`);
}

var bound = readAge.bind(student);

bound();

//------------------ Currying ------------------ 

let multiply = function(x, y){
  console.log(x * y);
};

let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5); //10

let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5); //15

//another way of Currying
let anotherMultiply = function(x){
  return function(y){
    console.log(x * y);
  };
};

let anotherMultiplyByTwo = anotherMultiply(2);
anotherMultiplyByTwo(3); //6

let anotherMultiplyByThree = anotherMultiply(3);
anotherMultiplyByThree(10); //30
