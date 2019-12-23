const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

let balance = [
  {
    name: "Chris",
    balance: 10.0
  },
  {
    name: "Klara",
    balance: -10.0
  }
];

let transactionHistory = [];

const addTransaction = (name, cost) => {
  const transaction = {
    name,
    cost,
    timestamp: new Date()
  };
  transactionHistory.push(transaction);
};

const findBalanceByName = name => balance.find(person => person.name.toLowerCase() === name.toLowerCase());

const updateBalance = (name, cost) => {
  const payingPerson = findBalanceByName(name);
  const rest = balance.filter(person => person !== payingPerson);

  if (!payingPerson) {
    throw new Error("Could not find person by that name.");
  } else if (!rest) {
    throw new Error("Could not find any other persons to update balance on.");
  }

  const costPerPerson = Math.round((cost / balance.length) * 100) / 100; // Round to nearest 2 decimal
  const indexOfPayingPerson = balance.indexOf(payingPerson);

  for (let i = 0; i < balance.length; i++) {
    if (i === indexOfPayingPerson) balance[i].balance = balance[i].balance + costPerPerson;
    else balance[i].balance = balance[i].balance - costPerPerson;
  }
};

const settle = (from, to, amount) => {
  const indexOfFromPerson = balance.indexOf(from);
  const indexOfToPerson = balance.indexOf(to);
  balance[indexOfFromPerson].balance += amount;
  balance[indexOfToPerson].balance -= amount;
};

const toNumber = string => {
  const number = Number(string);
  if (isNaN(number)) return null;
  return number;
};

app.get("/", (req, res) => res.send(balance));
app.get("/history/", (req, res) =>
  res.send(transactionHistory.slice().sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()))
);
app.post("/settle", (req, res) => {
  const { from, to, amount } = req.body;
  const amountNumber = toNumber(amount);
  const fromPerson = findBalanceByName(from);
  const toPerson = findBalanceByName(to);
  if (amountNumber !== null && !!fromPerson && !!toPerson) settle(fromPerson, toPerson, amountNumber);
  else return res.status(400).send();
  return res.send();
});
app.post("/", (req, res) => {
  const { cost, name } = req.body;
  const costNumber = toNumber(cost);
  if (typeof name === "string" && costNumber !== null) updateBalance(name, costNumber);
  else return res.status(400).send();
  addTransaction(name, costNumber);
  return res.send("Thanks for the post!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
