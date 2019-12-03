const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');



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


exports.resetUserPassword = async function (req, res){
    console.log('hit hupdate poassword')

    const { id , password1 } = req.body;


console.log(req.body)



    try {

        let user = await db('users').select('*').first().where({id: id});
        console.log('USER', user)

            // get user by id 
        bcrypt.compare(password1, user.password)
        .then(isMatch => {
            console.log('isMatch', isMatch)
            if(isMatch){
                return res.send(400).status({msg: 'Password cannot be same as previous password'});
                // cant be same as last password
            }
            else {
                bcrypt.genSalt(10, (err, salt)=> {
                    bcrypt.hash(password1, salt, (err, hash) => {
                        console.log('HASH', hash)
                        console.log('ID', id)
                        db('users')
                            .where({ id: id })
                            .update({ 
                                password: hash,
                                reset_password_token: null,
                                reset_password_expires: null
                             }).then( resp => {
                                 console.log('RESP', resp)
                            })
                    })
                })
            }
        })

      // send response?

    } catch (err) {
        console.log('error')
    } 
}
//TODO on registration create and set JWT token
// send response if email already exists