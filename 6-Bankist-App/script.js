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
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
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
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  });
  labelBalance.textContent = `${balance} €`;
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

// Event Handlers
// #### Login functionality
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    // Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`
    containerApp.style.opacity = 1;

    //Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    //Display movements
    displayMovements(currentAccount.movements);
    //Display balance
    calcDisplayBalance(currentAccount.movements);
    //Display Summary
    calcDIsplaySummary(currentAccount);

  }
});

// Transfer Money functionality
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  console.log(amount)
  const receiverAcc = inputTransferTo.value;
});
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