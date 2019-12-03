const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');




exports.getUser = async function (req, res){
    console.log('hit account controllor!',req.params.id  )
    
    try {
        await db('users').select('*').where({            
            reset_password_token: req.params.id  //todo this will need to be based on logged in user
        }).first().then(response => {
            console.log(Date.now(response.reset_password_expires))
            let date = Date.now(response.reset_password_expires)
            console.log('RESPONSE', response)
            console.log(lessThanOneHourAgo(date))
            res.json(response);
        })
      } catch (err) {
        console.log('get error', err)
      }
}

const lessThanOneHourAgo = (date) => {
    const HOUR = 1000 * 60 * 60;
    const anHourAgo = Date.now() - HOUR;

    return date > anHourAgo;
}
//TODO on registration create and set JWT token
// send response if email already exists