/*                        this                        */
//1. and 2.
//'use strict'
//#1-----------------
this.table = 'window table';
console.log(this.table);

//#2-----------------this inside a Method (inside an Object)-----------------
this.garage = {
  table: 'garage table',
  cleanTable(){
    console.log(`Cleaning ${this.table}`);
  }
};

let johnsRoom = {
  table: `John's table`,
  cleanTable(){
    console.log(`Cleaning ${this.table}`);
  }
};

johnsRoom.cleanTable();
this.garage.cleanTable();

//#3-----------------this inside a Function-----------------
// const cleanTable = function(){
//   console.log(`Cleaning ${this.table}`); //this is not a good idea if you want restrict outside access
// };

//cleanTable();

//#4-----------------using call-----------------
const cleanTable = function(){
  console.log(`Cleaning ${this.table}`);
};

cleanTable.call(this);

//#5-----------------this inside an Inner-Function-----------------
const cleanTableFromInside = function(extraInfo){
  const innerFunction = function(extraInfo){
    console.log(`Cleaning ${this.table} ${extraInfo}`);
  }
  innerFunction.call(this, extraInfo);
};

cleanTableFromInside.call(this, 'from the inside');

/* * * * * *`GOLDEN POINT` [re-doing #5] (about Arrow Function)* * * * * */
const cleanTableFromInsideArrow = function(extraInfo, arrowInfo){
  const innerFunction = () => { //here, after using the Arrow Function you can access the outer elements!
    console.log(`Cleaning ${this.table} ${extraInfo} ${arrowInfo}`);
  }
  innerFunction();
};

cleanTableFromInsideArrow.call(this, 'from the inside', 'using the arrow!');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//#6-----------------this inside a constructor (NOTE: 'prototype')-----------------
let createRoom = function(name){
  this.table = `Cleaning ${name}'s room's table`;
};

createRoom.prototype.cleanRoomTable = function(){
  console.log(`${this.table}`);
};

const johnsNewRoom = new createRoom('John');
const jennysNewRoom = new createRoom('Jenny');

johnsNewRoom.cleanRoomTable();
jennysNewRoom.cleanRoomTable();

//#7-----------------this inside a class [re-doing #6]-----------------
class Room{
  constructor(name){
    this.table = `Cleaning ${name}'s room's table from the class`;
  }
  
  cleanRoomTable(){
    console.log(`${this.table}`);
  }
};

const johnsNewRoomClass = new Room('John');
const jennysNewRoomClass = new Room('Jenny');

johnsNewRoomClass.cleanRoomTable();
jennysNewRoomClass.cleanRoomTable();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//3.
class Student{
  constructor(name, age, phoneNumber, boardMarks){
    this.name = name;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.boardMarks = boardMarks;
    Student.count++;
  }
  
  checkEligibility(){
    if(this.boardMarks >= 40){
      console.log(`${this.name} is eligible for college!`);
    }
    else{
      console.log(`${this.name} is not eligible for college. Better luck next time :)`);
    }
  }
  
  //Fat Arrow Function
  placementEligibility(){
    if(this.boardMarks > 75){
      let ageRequirement = (age) => {
        if(age > 18){
          return true;
        }
        else return false;
      };
      return ageRequirement(this.age);
    }
    else return false;
  }
};

Student.count = 0; //static variable

const s1 = new Student('Sid', '10', 9955443322, 89);
s1.checkEligibility();

const s2 = new Student('Ram', '12', 9955443326, 39);
const s3 = new Student('Shyam', '15', 9955443522, 59);
const s4 = new Student('Nikhil', '11', 9954443322, 67);
const s5 = new Student('Jason', '19', 9955443320, 86);

console.log(`Total number of students: ${Student.count}`);





/*                        fat arrow                        */
// 1.

// var getA = function(a){
//   return a;
// };

//#1
var getA = a => a;

console.log(getA(1));

//#2
let square = (a) => {
  return a*a;
};

console.log(square(2));

//#3
let mult = (a,b) => {
  return a*b;
};

console.log(mult(5,8));

//#4 function-inside-function (accessing variable from outside the function using the arrow function!)
var x = function(){
  this.y = `I'm outside`;
  let z = () => {
    console.log(this.y);
  };
  
  z();
}

x();

// 2.(note: done inside the Class) and 3.
console.log(`Is ${s1.name} eligible for placement? ${s1.placementEligibility()}`);
console.log(`Is ${s2.name} eligible for placement? ${s2.placementEligibility()}`);
console.log(`Is ${s3.name} eligible for placement? ${s3.placementEligibility()}`);
console.log(`Is ${s4.name} eligible for placement? ${s4.placementEligibility()}`);
console.log(`Is ${s5.name} eligible for placement? ${s5.placementEligibility()}`);
