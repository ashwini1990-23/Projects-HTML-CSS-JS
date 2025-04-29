'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Displaying movements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //soritng
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov} €</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculating and Displaying Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  });
  labelBalance.textContent = `${acc.balance} €`;
}

//Computing User Names
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase().split(' ').map(function (name) {
        return name[0];
      }).join('');
    // console.log(acc.username);
  })

}
createUserNames(accounts);

// Calculating Summary
const calcDIsplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`

}

// Update UI
const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display Summary
  calcDIsplaySummary(acc);
}

// Event Handlers
// #### Login functionality
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('LOGIN');
    // Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`
    containerApp.style.opacity = 1;

    //Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    //Update the UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Transfer Money functionality
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // Making input fields blur
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username) {
    console.log("Transfer Valid");
    // Doing the Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
});

// Loan transfer
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  console.log(amount);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    console.log("Loan")
    // Add movement
    currentAccount.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
})

// Close an account
const closeAccount = btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    // Delete the account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Make input fields blur
  inputCloseUsername.value = inputClosePin.value = '';
})

// Sorting
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//  ############ Chalenge 1

// const juliasData = [3, 5, 2, 12, 7];
// const katesData = [4, 1, 15, 8, 3];

// const juliasDogsData = juliasData.slice(1, 3);
// console.log(juliasDogsData[1]);
// const newDogsData = juliasDogsData.concat(katesData);
// console.log(newDogsData);

// const correctAge = function (dogsArr) {
//   dogsArr.forEach(function (age, i) {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult and ${age} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy :-)`);
//     }
//   })
// }
// correctAge(newDogsData);

// ####################

//  ############ Chalenge 2
// const dogsAges = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = function (ages) {

//   console.log(ages.map(function (dogAge) {
//     let humanAge;
//     if (dogAge <= 2) {
//       return humanAge = 2 * dogAge;
//     } else {
//       return humanAge = 16 + dogAge * 4;
//     }
//   }).filter(function (age) {
//     if (age >= 18) return age;
//   }).reduce(function (acc, age) {
//     return (acc + age);
//   }, 0) / 5);
// }
//###############################

// calcAverageHumanAge(dogsAges);

// ################  Method Chaining
// const euroToUsd = 1.1;
// const deposits = account1.movements.filter(function (mov) {
//   if (mov > 0) return mov;
// }).map(function (mov) {
//   return mov * euroToUsd;
// }).reduce(function (acc, mov) {
//   return acc + mov;
// }, 0)

// console.log(deposits);
//###########################

// ################# Challenge 3

//  #######

// const firstWithdrawals = account1.movements.find(mov => mov < 0)
// console.log(account1.movements);
// console.log(firstWithdrawals);

// for (const account of accounts) {
//   if (account.owner === 'Sarah Smith')
//     console.log(account);
// }

// ############# Chalenge 4 
// const breeds = [
//   {
//     breed: 'German Shepherd',
//     averageWeight: 32,
//     activities: ['fetch', 'swimming'],
//   },
//   {
//     breed: 'Dalmatian',
//     averageWeight: 24,
//     activities: ['running', 'fetch', 'agility'],
//   },
//   {
//     breed: 'Labrador',
//     averageWeight: 28,
//     activities: ['swimming', 'fetch'],
//   },
//   {
//     breed: 'Beagle',
//     averageWeight: 12,
//     activities: ['digging', 'fetch'],
//   },
//   {
//     breed: 'Husky',
//     averageWeight: 26,
//     activities: ['running', 'agility', 'swimming'],
//   },
//   {
//     breed: 'Bulldog',
//     averageWeight: 36,
//     activities: ['sleeping'],
//   },
//   {
//     breed: 'Poodle',
//     averageWeight: 18,
//     activities: ['agility', 'fetch'],
//   },
// ];

// // 1
// const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
// console.log(huskyWeight);

// // 2
// const dogBothActivities = breeds.find(breed => breed.activities.includes('running') && breed.activities.includes('fetch')).breed;
// console.log(dogBothActivities)

// // 3
// //const allActivities = breeds.map(breed => breed.activities).flat();
// const allActivities = breeds.flatMap(breed => breed.activities);
// console.log(allActivities);

// ########################################33

//Array Sorting #############
//return < 0(-1),  A,B (keep order)
//return > 0 (1), B,A (switch order)
//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a<b) return -1;
// });
// console.log(movements)

//Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a<b) return 1;
// });
// console.log(movements)

// const dice = Array.from({ length: 100 }, (_, i) => i + 1);
// console.log(dice);
// ###############

// ########### Array Methods Practice #################
// 1.
//const sum = accounts.map((acc) => acc.movements).flat();
// const sum = accounts.flatMap((acc) => acc.movements);
// const depositSum = sum.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
// console.log(sum);
// console.log(depositSum);
// // 2.
// const depositCount = accounts.flatMap((acc) => acc.movements).filter((mov) => mov >= 1000);
// console.log(depositCount.length);
// // Or using reduce
// const depositCountReduce = accounts.flatMap((acc) => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
// console.log(depositCountReduce);
// 3.
// const { deposits, withdrawals } = accounts.flatMap(acc => acc.movements)
//   .reduce((sum, cur) => {
//     cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
//     return sum;
//   }, { deposits: 0, withdrawals: 0 })
// console.log(deposits, withdrawals);
// 4.
// Title Case: this is anice title -> This Is a Nice Title
// const converTitleCase = function (title) {
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const capitalize = str => str[0].toUpperCase() + str.slice(1);
//   const titleCase = title.toLowerCase()
//     .split(' ')
//     .map(word => exceptions.includes(word) ? word : capitalize(word))
//     .join(' ');
//   return capitalize(titleCase);
// };
// console.log(converTitleCase('this is a nice title'));
// console.log(converTitleCase('this is a LONG title but not too long'));
// console.log(converTitleCase('and here is another title with an EXAMPLE'));

// ############ Challenge 5 ##################
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//Task 1: 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
console.log(dogs)

// Task 2: 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
const owner = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(`Sarah's dog eats too ${owner.curFood > owner.recFood ? 'much' : 'little'} food`);

// Task 3: Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
const ownersTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).map(dog => dog.owners).flat();
const ownersTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).map(dog => dog.owners).flat();
console.log(ownersTooMuch);
console.log(ownersTooLittle);

// Task 4: Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

const tooMuch = ownersTooMuch.join(' and ');
console.log(`${tooMuch}'s dogs eat too much!`);
console.log(`${ownersTooLittle.join(' and ')}'s dogs eat too little!`);

// Task 5: Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
const exact = dogs.some(dog => dog.curFood === dog.recFood);
console.log(exact);
// Task 6: Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
const eatOkay = dogs.every(dog => dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.10));
console.log(eatOkay);

// Task 7: Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const okayArray = dogs.filter(dog => dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.10))
console.log(okayArray);

// Task 8:Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
