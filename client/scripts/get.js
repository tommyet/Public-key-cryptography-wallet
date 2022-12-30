// import server from "./server";
/* const http = require('http')

async function request() {
    const number = await http.get('http://localhost:3042/number');
    console.log(number)
}

request() */

/* async function request2() {
    console.log(await server.get('number'))
}

request2() */

// npm install -g jsx
// jsx --run get.jsx

async function request() {
    const x = await fetch("http://localhost:3042/number").then((res) => res.json()).catch((err) => console.log(err))
    console.log(x.number)
  }

  request()
