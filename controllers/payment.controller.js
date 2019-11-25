const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

// app.use(require("body-parser").text());


exports.charge = async function (req, res){
    console.log('hit payment controllor!')

    try {
        let {status} = await stripe.charges.create({
          amount: 0.01,
          currency: "usd",
          description: "An example charge",
          source: req.body
        });
    
        res.json({status});
      } catch (err) {
        console.log(err);
        res.status(500).end();
      }
}

//TODO on registration create and set JWT token
// send response if email already exists