// ASSESSMENT 6: JavaScript Coding Practical Questions with Jest

// Please read all questions thoroughly
// Pseudo coding is REQUIRED
// If you get stuck, please leave comments to help us understand your thought process

// Use test driven development to complete the following questions
// Add appropriate dependencies: $ yarn add jest

// Reminder: The test will call your function
// Run the file with the following command: $ yarn jest

// ********* TEST TEMPLATE ************
// describe("aFunction", () => {
//       it("description of what aFunction outputs with a given input", () => {
//         expect(aFunction()).toEqual("expected outcome")
//       })
//     })

// --------------------1) Create a function that takes in an array of objects and returns an array with a sentence about each person with their name capitalized.

// a) Create a test with an expect statement using the variable provided.

describe("hitchhikersGuideToProgramming", () => {
  const people = [
    { name: "ford prefect", occupation: "a hitchhiker" },
    { name: "zaphod beeblebrox", occupation: "president of the galaxy" },
    { name: "arthur dent", occupation: "a radio employee" },
  ];
  // Expected output: ["Ford Prefect is a hitchhiker.", "Zaphod Beeblebrox is president of the galaxy.", "Arthur Dent is a radio employee."]
  it("returns an array with a sentence about each person with their name capitalized", () => {
    expect(hitchhikersGuideToProgramming(people)).toEqual([
      "Ford Prefect is a hitchhiker.",
      "Zaphod Beeblebrox is president of the galaxy.",
      "Arthur Dent is a radio employee.",
    ]);
  });
});

// ReferenceError: hitchhikersGuideToProgramming is not defined

// b) Create the function that makes the test pass.

//pseudo: (this code is pretty ugly; i tried to refactor a few times, prepare thyself)
// create a function called hitchhikersGuideToProgramming that takes in an array of objects and returns an array with a sentence about each person with their name capitalized
// we know our objects all have a name key and an occupation key, so we can call on those in our function using dot notation.
// within our function we are going to use .map() to iterate over the argument array. (here we go) within our map, we can use string interpolation to return our expected sentence output.
// GENERALLY WHAT IM GOING FOR (PLAIN TEXT)- `${first name caps} ${last name caps} is {occupation}.`
// in order to access each word that we want to capitalize, we are going to use a few built in methods. given our prompt, each name key has two words seperated by an empty space.
// in our map, we can access the first letter of the first name by using dot notation followd by the 0 index in curly brackets.

// value.name[0]

// to capitalize that letter we will use .toUpperCase(), this will capitalize the entire string
// in order to get back the rest of the string lower case, we will use the .slice() built in method to return everything in the string starting at the 1 index, and ending at the space seperating our two words (" ").
// concat our slice to our first letter with +.
// this super bloated technique will return the first word in the name key capitalized

// value.name[0].toUpperCase() + value.name.slice(1, value.name.indexOf(" "))

// cool, now we need to capitalize the second word (last name) in the name key. the concept is the same, but we are accessing different indexes
// to access the first letter of the second word we can put an .indexOf() method in the brackets following value.name

//  value.name[value.name.indexOf(" ") + 1]
// this will access the first letter of the word after the first instance of an empty space

// follow that with .toUpperCase() and then concat another slice, with the starting index being TWO indexes forward from the empty space index.

// value.name[value.name.indexOf(" ") + 1].toUpperCase() +
//     value.name.slice(value.name.indexOf(" ") + 2)

// now that we have capitalized each word in the name key, all we have to do is use string interpolation, placing each super long method in ${} and then call on the occupation key ${value.occupation}. `${first} ${last} is {value.occupation}.`

// make sure you put a return in front of your map, and your string interpolation.

// then you can cry!!!

// -------------------

// this was the first pass, not very readable, and not dynamic for a name key with more than two words as a value.

// const hitchhikersGuideToProgramming = (array) => {
//   return array.map((value) => {
//     return `${
//       value.name[0].toUpperCase() + value.name.slice(1, value.name.indexOf(" "))
//     } ${
//       value.name[value.name.indexOf(" ") + 1].toUpperCase() +
//       value.name.slice(value.name.indexOf(" ") + 2)
//     } is ${value.occupation}.`;
//   });
//};

// -------------------

// second pass, assigned each method for each word to a varable; firstName and lastName, then used string interpolation with the variables, more readible, still not the most dynamic

// const hitchhikersGuideToProgramming = (array) => {
//   return array.map((value) => {
//     const firstName =
//       value.name[0].toUpperCase() +
//       value.name.slice(1, value.name.indexOf(" "));
//     const lastName =
//       value.name[value.name.indexOf(" ") + 1].toUpperCase() +
//       value.name.slice(value.name.indexOf(" ") + 2);
//     return `${firstName} ${lastName} is ${value.occupation}.`;
//   });
// };

// ---------------------

// third pass, maps over array, and then splits the name keys into their own array, maps over that new array, and uses our earlier method without having to access the empty space index, cleaner and dynamic. I also tried out the .substring() method here to try something other than .slice(), still works.

const hitchhikersGuideToProgramming = (array) => {
  return array.map((value) => {
    const capName = value.name
      .split(" ")
      .map((value) => {
        return value[0].toUpperCase() + value.substring(1);
      })
      .join(" ");
    return `${capName} is ${value.occupation}.`;
  });
};

// ---------------------

// final pass, regex, obviously i had to research the syntax here, and it doesn't really look that much more readable, unless you just accept that the regex is going to work as someone who didnt write this code. Basically it is just finding the first letter of each word in value.name and capitalizes only that letter.

// const hitchhikersGuideToProgramming = (array) => {
//   return array.map((value) => {
//     return `${value.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
//       letter.toUpperCase()
//     )} is ${value.occupation}.`;
//   });
// };

// Test Suites: 1 passed, 1 total
// Tests:       1 passed, 1 total

// --------------------2) Create a function that takes in a mixed data array and returns an array of only the REMAINDERS of the numbers when divided by 3.

// a) Create a test with an expect statement using the variables provided.

describe("onlyNumbers", () => {
  const hodgepodge1 = [23, "Heyyyy!", 45, -10, 0, "Yo", false];
  // Expected output: [ 2, 0, -1, 0 ]
  const hodgepodge2 = [5, "Hola", 43, -34, "greetings", true];
  // Expected output: [ 2, 1, -1 ]
  it("takes in a mixed data array and returns an array of only the REMAINDERS of the numbers when divided by 3", () => {
    expect(onlyNumbers(hodgepodge1)).toEqual([2, 0, -1, 0]);
    expect(onlyNumbers(hodgepodge2)).toEqual([2, 1, -1]);
  });
});

// ReferenceError: onlyNumbers is not defined

// b) Create the function that makes the test pass.

// pseudo: (im gonna do less pseudo on the rest of these)
// create a function called onlyNumbers that takes in a mixed array and returns only each of those numbers remainders when divided by three
// first we will take the argument array and filter out everything that isnt a number.
// in our filter we want to return only values that are numbers do this by using:
// return typeof value === "number"
// typeof returns the data type of a value, we only want to return "number"
// now we have an array of only numbers
// after our filter we will call on a .map to iterate over each item in the filtered array and return each values remainder when divided by three using the modulo operator %
// easy peasy

const onlyNumbers = (array) => {
  return array
    .filter((value) => {
      return typeof value === "number";
    })
    .map((value) => {
      return value % 3;
    });
};

// Test Suites: 1 passed, 1 total
// Tests:       2 passed, 2 total

// --------------------3) Create a function that takes in an array of numbers and returns the sum of all the numbers cubed.

// a) Create a test with an expect statement using the variables provided.

describe("cubeEmNAddEm", () => {
  const cubeAndSum1 = [2, 3, 4];
  // Expected output: 99
  const cubeAndSum2 = [0, 5, 10];
  // Expected output: 1125
  it("takes in an array of numbers and returns the sum of all the numbers cubed", () => {
    expect(cubeEmNAddEm(cubeAndSum1)).toEqual(99);
    expect(cubeEmNAddEm(cubeAndSum2)).toEqual(1125);
  });
});

// ReferenceError: cubeEmAndAddEm is not defined

// b) Create the function that makes the test pass.

// pseudo:
// create a function called cubeEmNAddEm that takes in an array of numbers
// within our function define a variable named sum that equals 0
// iterate over the argument array by calling .map()
// in the .map() pass in value, and perform sum += value ** 3
// this will take each value in the array, cube it, then add that result to sum, and reassign sum to that number (+=), so that sum can accumulate through each index.
// return sum
// easy peasy, no crying here

const cubeEmNAddEm = (array) => {
  let sum = 0;
  array.map((value) => (sum += value ** 3));
  return sum;
};

// Test Suites: 1 passed, 1 total
// Tests:       3 passed, 3 total
