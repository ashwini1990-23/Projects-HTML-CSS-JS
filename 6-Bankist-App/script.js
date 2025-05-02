'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// ******************** Data before adding Numbers, Dates, Timers and Internationalization code **********
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];
// ************************************

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2025-04-25T17:01:17.194Z',
    '2025-04-27T23:36:17.929Z',
    '2025-04-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////
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

// Formatting Date or 
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  //Making above date format in INTL
  return new Intl.DateTimeFormat(locale).format(date);
}

// Formatting currency
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

// Displaying movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => (
    { movement: mov, movementDate: acc.movementsDates.at(i), })
  );
  console.log(combinedMovsDates);

  //soritng
  // const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);

    // Using Intl to display currency type dynamically
    // const formattedMov = new Intl.NumberFormat(acc.locale, {
    //   style: 'currency',
    //   currency: acc.currency,
    // }).format(movement);
    // console.log(formattedMov);
    const formattedMov = formatCur(obj.movement, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov} </div>
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
  // labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency)
}

//Computing User Names
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase().split(' ').map(function (name) {
        return name[0];
      }).join('');
  })

}
createUserNames(accounts);

// Calculating Summary
const calcDIsplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //  labelSumIn.textContent = `${incomes.toFixed(2)} €`;
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)} €`;
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);

}

// Update UI
const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);
  //Display balance
  calcDisplayBalance(acc);
  //Display Summary
  calcDIsplaySummary(acc);
}

// Event Handlers

// **** Experimenting with INTL(Internationalization) API ****
// ISO language code table: http://www.lingoes.net/en/translator/langcode.htm
// const now1 = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long', // month: 'long'=May  or '2-digit' = 05
//   year: 'numeric',
//   weekday: 'long'  //'short', 'narrow'
// }
// // To get Locale from users browser dynamically
// const locale = navigator.language;
// //console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now1);
// //console.log(new Intl.DateTimeFormat('en-US', options).format(now1));
// *************************

// #### Login functionality

// Logout Timer functionality
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call back call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When the time is at 0(after the timer expires), stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started'
      containerApp.style.opacity = 0;
    }

    // Decrease 1 second
    time = time - 1; //time--
  }
  // Set time to 5 minutes
  let time = 120;
  // Call the timer every 1 second
  tick();
  const timer = setInterval(tick, 1000)
  return timer;
}

let currentAccount, timer;

// FAKE IT AS: ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);
  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // console.log('LOGIN');
    // Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`
    containerApp.style.opacity = 1;

    // Current Date and Time
    const now1 = new Date();
    // const day = `${now1.getDate()}`.padStart(2, 0);
    // const month = `${now1.getMonth() + 1}`.padStart(2, 0);
    // const year = now1.getFullYear();
    // const hour = `${now1.getHours()}`.padStart(2, 0);
    // const min = `${now1.getMinutes()}`.padStart(2, 0);
    // // console.log(day, month, year)
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // month: 'long'=May  or '2-digit' = 05
      year: 'numeric',
      // weekday: 'long'  //'short', 'narrow'
    }
    // To get Locale from users browser dynamically
    // const locale = navigator.language;
    //console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now1);
    //console.log(new Intl.DateTimeFormat('en-US', options).format(now1));

    //Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // Call logout timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    //Update the UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Transfer Money functionality
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update the UI
    updateUI(currentAccount);

    // Reset the timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// Loan transfer
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  console.log(amount);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    console.log("Loan")
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add Loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update the UI
      updateUI(currentAccount);

      // Reset the timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500)
  }
})

// Close an account
const closeAccount = btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +(inputClosePin.value)) {
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
  displayMovements(currentAccount, !sorted);
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
// Numbers
// console.log(22 === 22.0);
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3)

// // Converting string to number
// console.log(Number('22')); // OR
// console.log(+'22');
// // Parsing
// console.log(Number.parseInt('30', 10));

// // Math and Rounding
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));

// console.log(Math.trunc(Math.random() * 6) + 1);
// Random number generator function
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// console.log(randomInt(10, 20));
// // ****** Rounding Integers ******
// console.log(Math.trunc(23.3));

// //rounds number to nearest integer
// console.log(Math.round(23.3)); //23
// console.log(Math.round(23.9)); //24

// //rounds up to nearest integer
// console.log(Math.ceil(23.3)); //24
// console.log(Math.ceil(23.9)); //24

// //rounds number down to nearest integer
// console.log(Math.floor(23.3)); //23
// console.log(Math.floor(23.9)); //23
// // rounds number up to nearest integer for -ve numbers
// console.log(Math.floor(-23.3)); //24
// // *************88
// // ************ Rounding floating point numbers / decimals
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.345).toFixed(2));
// console.log(+(2.345).toFixed(2));

// // ************* Reaminder operator: use it when you want to do something 'every Nth time'  ***********
// const evenOdd = (num) => {
//   if (num % 2 === 0) {
//     return console.log('even')
//   } else {
//     return console.log('odd');
//   }
// }
// console.log(evenOdd(3));
// **************

// *************** Date- Create date: 4 ways ************
// 1
// const now = new Date();
// console.log(now);
// // 2 : parse date from a date string
// console.log(new Date('Apr 30 2024'));
// // Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// // Timestamp for the date (Timestamp: number of miliseconds passed since Jan 1 1970)
// console.log(future.getTime());
// // To get Time stamp for right now
// console.log(Date.now());
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
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
//   { weight: 18, curFood: 244, owners: ['Joe'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// //Task 1: 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
// dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
// console.log(dogs)

// // Task 2: 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// const owner = dogs.find(dog => dog.owners.includes('Sarah'))
// console.log(`Sarah's dog eats too ${owner.curFood > owner.recFood ? 'much' : 'little'} food`);

// // Task 3: Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
// const ownersTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).map(dog => dog.owners).flat();
// const ownersTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).map(dog => dog.owners).flat();
// console.log(ownersTooMuch);
// console.log(ownersTooLittle);

// // Task 4: Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

// const tooMuch = ownersTooMuch.join(' and ');
// console.log(`${tooMuch}'s dogs eat too much!`);
// console.log(`${ownersTooLittle.join(' and ')}'s dogs eat too little!`);

// // Task 5: Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
// const exact = dogs.some(dog => dog.curFood === dog.recFood);
// console.log(exact);
// // Task 6: Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
// const eatOkay = dogs.every(dog => dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.10));
// console.log(eatOkay);

// // Task 7: Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// const okayArray = dogs.filter(dog => dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.10))
// console.log(okayArray);

// // Task 8:Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.

// const arrayGroups = Object.groupBy(dogs, dog => {
//   if (dog.curFood > dog.recFood)
//     return 'too-much';
//   else if (dog.curFood < dog.recFood) { return 'too-little'; }
//   else return 'exact';
// });
// console.log(arrayGroups);

// //Task 9: Group the dogs by the number of owners they have
// const groupByNoOfOwner = Object.groupBy(dogs, (dog) => {
//   // if (dog.owners.length === 1) {
//   //   return 'one-owner';
//   // } else if (dog.owners.length === 2) {
//   //   return 'two-owners';
//   // }
//   // else return 'three-owners'
//   return `${dog.owners.length}-owner`
// })
// console.log(groupByNoOfOwner);

// // Task 10:Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!
// const sortDogArray = dogs.toSorted((a, b) => a.recFood - b.recFood)
// console.log(sortDogArray);
// const sortDogArray1 = dogs.toSorted((a, b) => b.recFood - a.recFood)
// console.log(sortDogArray1);

// ****** Operations with Dates **********
// Moment.js : is a Date library which we use to get "precise dates calculations" in case of Daylight savings/time changes 
// console.log(new Date(2037, 3, 4), new Date(2037, 3, 14));
// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const day1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
// console.log(day1);
// **********

// ************* Intl with Numbers *******
// MDN doc : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
// const num = 3884764.23;
// const options = {
//   style: 'currency',   // or 'percent', 'currency'
//   unit: 'kilogram',
//   currency: 'EUR',  // Currency is independent of Locale
//   //useGrouping: false
// }
// console.log(new Intl.NumberFormat('de-DE', options).format(num));
// *************************

// ************ Timers ****************
//setTimeout : runs only once after a defined time
// setInterval: keeps running basically forever until we stop it  
// setInterval(function () {
//   const now = new Date();
//   console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
// });