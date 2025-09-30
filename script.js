'use strict';
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = numPassengers * 199
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

console.log(createBooking('LH123'));

// Challenge 1 (Default Parameters):

// Write a function called calculatePrice that:

// Takes price, taxRate (default = 0.1), and discount (default = 0).

// Returns the final price after applying tax and discount.

// 👉 Example:

// calculatePrice(100)        // 110
// calculatePrice(100, 0.2)   // 120
// calculatePrice(100, 0.2, 10) // 110

function calculatePrice(price, taxRate = 0.1, discount = 0) {
  return price + price * taxRate - discount;
}

// Challenge 2:
// Update calculatePrice so that:

// If the discount is greater than the price, the function should return 0 (because a discount can’t make the price negative).

// 👉 Example:

// calculatePrice(50, 0.1, 100) // 0

function calculatePrice(price, taxRate = 0.1, discount = 0) {
  if (discount > price) return 0;
  else return price + price * taxRate - discount;
}

// 🟢 Part 2: Passing Arguments → Value vs. Reference
// Quick explanation

// Primitive values (numbers, strings, booleans, null, undefined, symbol, bigint) are passed by value → a copy is made.

// Objects & arrays are passed by reference → the reference (memory address) is copied, so changes inside the function affect the original.

// Example:
// // Primitive (value)
// let x = 10;
// function changeValue(a) {
//   a = a * 2;
// }
// changeValue(x);
// console.log(x); // still 10 ✅

// // Object (reference)
// let user = { name: "x" };
// function changeUser(u) {
//   u.name = "a";
// }
// changeUser(user);
// console.log(user.name); // a ❌ original object changed

function doubleNumbers(numArr) {
  for (let i = 0; i < numArr.length; i++) {
    numArr[i] = numArr[i] * 2;
  }
  return numArr;
}
console.log(doubleNumbers([2, 3, 4]));

// 🟢 Challenge 4: Objects & Reference

// Write a function updateUser that:

// Takes a user object with { name, age }.

// Inside the function, increase the user’s age by 1.

// Return the updated object.

// 👉 Example:

// let person = { name: "Shivi", age: 22 };
// updateUser(person);
// console.log(person); // { name: "Shivi", age: 23 }  (original changed!)

// ⚡ This will test if you understand how objects are passed by reference.
const user = {
  name: 'abc',
  age: 12,
};
function updateUser(user) {
  user.age++;
  return user;
}
console.log(updateUser(user));

/*
👉 Next Challenge 5 (mix of defaults + reference):

Write a function createUser that:

Takes name and age (default age = 18).

Returns a new user object { name, age }.

If no name is given, default it to "Anonymous".

👉 Example:

console.log(createUser("Alice"));     // { name: "Alice", age: 18 }
console.log(createUser());            // { name: "Anonymous", age: 18 }
console.log(createUser("Bob", 22));   // { name: "Bob", age: 22 }


*/

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...others] = str.split(' ');
  return [firstWord.toUpperCase(), ...others].join(' ');
};
// higher order function
const transformer = function (str, fn) {
  console.log(`Original String : ${str}`);

  console.log(`Transformed String : ${fn(str)}`);
  console.log(`Transformed By : ${fn.name}`);
};

transformer('javascript is the best!', upperFirstWord);
transformer('javascript is the best!', oneWord);

function high5() {
  console.log('👋🏻');
}

document.body.addEventListener('click', high5());

['a', 'b', 'c'].forEach(high5);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}! ${name}`);
  };
};

const greet1 = greeting => {
  return name => {
    console.log(`${greeting}! ${name}`);
  };
};

const greet1hey = greet1('😉');
greet1hey('Rachel');

const greeterHey = greet('qwe');
greeterHey('Samantha');

const indigo = {
  airline: 'indigo',
  iatacode: 'IN',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum} `
    );
    this.bookings.push({
      flight: `${this.iatacode} ${flightNum}`,
      name,
    });
  },
};

indigo.book(349, 'Amandeep');

const euroWings = {
  airline: 'Eurowings',
  iatacode: 'EU',
  bookings: [],
};
console.log(indigo);

const book = indigo.book;

// book(23,'asd')

// CALL METHOD

book.call(euroWings, 234, 'saear');
console.log(euroWings);

const swiss = {
  airline: 'Swiss Air Lines',
  iatacode: 'LX',
  bookings: [],
};

book.call(swiss, 234, 'asdfkjaksf');
console.log(swiss);

// APPLY METHOD
const flightData = [345, 'qwer'];
book.apply(swiss, flightData);
book.call(swiss, ...flightData);
console.log(swiss);

// BIND METHOD
const bookEW = book.bind(euroWings);
const bookLX = book.bind(swiss);
const bookIN = book.bind(indigo);
bookEW('115', 'euepsfg');
bookLX('215', 'sissiwer');
bookIN('345', 'ind qer');
// console.log(euroWings);

console.log('----------------------------------------------------');

// with event listeners
indigo.planes = 200;
indigo.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(`Planes : ${this.planes}`);
};
document.querySelector('.buy').addEventListener('click', () => {
  indigo.buyPlane();
});

document
  .querySelector('.buy')
  .addEventListener('click', indigo.buyPlane.bind(indigo));

// challenge : one function returning another function
const addTax = (value, taxRate) => value + value * taxRate;

const addVAT = addTax.bind(null, 0.23);

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

console.log(
  '--------------------------Coding Challenge 1--------------------------'
);

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const ans = prompt(
      `${this.question} \n${this.options.join('\n')} \n(Write option number)`
    );
    return ans;
  },
  displayResults(type = 'array') {
    if (type == 'string') {
      console.log(`Poll results are ${[...this.answers]}`);
    } else if (type == 'array') {
      console.log(`${this.answers}`);
    } else {
      console.log(`pta nhi kya chal rha hai ${type}  `);
    }
  },
};

// let userAnswer =  Number(poll.registerNewAnswer());

document.querySelector('.poll').addEventListener('click', () => {
  const userAnswer = Number(poll.registerNewAnswer());
  if (userAnswer >= 0 && userAnswer <= 3) {
    poll.answers[userAnswer] += 1;
    console.log(poll.answers);
    poll.displayResults('string');
  } else {
    window.alert(`INVALID ANSWER: Enter a valid answer`);
  }
});

// const testData = {
//   testData1: [5, 2, 3],
//   testData2: [1, 5, 3, 9, 6, 1],
// };

const displayNew1 = poll.displayResults.bind({ answers: [5, 2, 3] });
displayNew1();

const displayNew2 = poll.displayResults.bind({ answers: [1, 5, 3, 9, 6, 1] });
displayNew2();

// if (userAnswer >= 0 && userAnswer <= 3) {
//   console.log(typeof userAnswer);

//   console.log(`ARRAY: ${(poll.answers[userAnswer] += 1)}`);
//   console.log(poll.answers);
// } else {
//   window.alert(`INVALID ANSWER: Enter a valid answer`);
// }

// poll.registerNewAnswer();
// const answerByUser = poll.registerNewAnswer();
// console.log(` answerByUser ${poll.registerNewAnswer()}`);

// const prompted = prompt('hey cute number');
// console.log(prompted);

// const num = [1, 2, 3];
// console.log(Array.isArray(num));

// IIFE IMMEDIATELY INVOKING FUNCTION EXPRESSION
console.log(`------------------------------IIFE ------------------------`);

function runOnce() {
  console.log(`This is run once function `);
}

runOnce();

(() => console.log(`😉😉😉`))();
(function () {
  console.log(`This is IIFE! 🔴`);
})();

// CLOSURES
console.log(`------------------------------CLOSURES------------------------`);

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

let f;

const g = function () {
  const a = 4;
  f = function () {
    console.log(a * 2);
  };
};

g();
f();

const h = function () {
  const b = 3;
  f = function () {
    console.log(b * 3);
  };
};

h();
f();

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers! 🎊`);
    console.log(`There are 3 groups each with ${perGroup} passengers! 🎊`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds! `);
};

boardPassengers(15, 2 );
