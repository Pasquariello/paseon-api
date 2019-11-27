const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');




exports.register_user = async function (req, res){
    console.log('hit register controllor!')

    let user_obj = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        company: req.body.company, 
        account_type: 'basic'
    }

try {
        let user = await db('users').select('email').where({email: user_obj.email});

        if (!user.length) {

        let my_user = await db('users').insert({
            first_name: user_obj.first_name, 
            last_name: user_obj.last_name,
            email: user_obj.email, 
            company: user_obj.company,
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
            }
            )

            
        });

        }
    } catch (err) {
        console.log('get error', err)
    }
}

//TODO on registration create and set JWT token
// send response if email already exists