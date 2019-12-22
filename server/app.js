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
    name: "Clara",
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

const updateBalance = (name, cost) => {
  const payingPerson = balance.find(person => person.name.toLowerCase() === name.toLowerCase());
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

app.get("/", (req, res) => res.send(balance));
app.get("/history/", (req, res) => res.send(transactionHistory.reverse()));
app.post("/", (req, res) => {
  const { cost, name } = req.body;
  const costNumber = Number(cost);
  if (typeof name === "string" && !!costNumber) updateBalance(name, costNumber);
  else res.status(400).send();
  addTransaction(name, costNumber);
  res.send("Thanks for the post!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
