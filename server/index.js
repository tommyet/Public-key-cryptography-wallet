const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x04cad2059caa5dc5f64274cbe9fc844db2029ddb2e973adf02d31874040dfe62dcd1c5d519a51ae489c3f3f33c90ba08649937e60b2bc34e3a3a79421079daebc8": 100,
  // 509abf9c76d148f8fab91cbeb84dc906ee7459ed3271d95500dbaa3823a687c7
  "0x04b6ba70ea100ea290ae3e281c8c6aea8762942bf3988be38f9642c4961bc2a2d1937b1f1929dd176b44399db1dd5c43a3179c215b8889fc8b7033a388a120eb76": 50,
  // 0176148e7a49d0b74251f701f62b0dc70b571ca0b1f6d72989b36059e46ad895
  "0x045a4a221562efa02f30761813c336fd79bda724d5dd8476fcd142ee5a9866dfe960e9e858ac2c28133269b2c0240c3ca05280c4f9392c0079f990a97540a1fa62": 75,
  // a396bdb394c0a4ff76d9fb2d60cff1fc26e893d65bd193d07c8c81ecbdcdd7ca
};

let number = 1;

app.get("/number", (req, res) => {
  res.send({ number });
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

// want to get my number variable from Trasnfer.jsx

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    number++
    res.send({ balance: balances[sender] });
    // need something here?
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
