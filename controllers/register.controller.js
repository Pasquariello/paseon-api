const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');




exports.register_user = async function (req, res){
    console.log('hit register controllor!', req.body)

    let user_obj = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        company: req.body.company, 
        password: req.body.password1,
        account_type: 'basic'
    }

    try {
        let user = await db('users').select('email').where({email: user_obj.email});

        if (!user.length) {

        // let password = hashPassword(user_obj.password)
        // console.log('PASSWORD', password)


            bcrypt.genSalt(10, (err, salt)=> {
                bcrypt.hash(user_obj.password, salt, (err, hash) => {
                    // Store hash in your password DB.
                    console.log('HASH', hash )

                    db('users').insert({
                        first_name: user_obj.first_name, 
                        last_name: user_obj.last_name,
                        email: user_obj.email, 
                        company: user_obj.company,
                        password: hash,
                        account_type: user_obj.account_type
                    }).returning('*').then(resp => {
                        const payload = resp[0];
                        console.log('payload', payload);
                        jwt.sign(
                        payload,
                        config.get('jwtSecret'),
                        { expiresIn: 360000 }, // 100 hours - 4ish days
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token, payload });
                        });
                    });
                
                });
            });

        }
    } catch (err) {
        console.log('get error', err)
    }
}

//TODO on registration create and set JWT token
// send response if email already exists