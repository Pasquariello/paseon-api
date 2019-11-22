const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto')



exports.register_user = async function (req, res){
    console.log('hit register controllor!')

    let user = {
        fist_name: req.body.fist_name,
        last_name: req.body.last_name,
        email: req.body.email,
        company: req.body.company
    }

    try {
        console.log('try', req)
        await await db('users').select('email').where({
            email: user.email
        }).then(response => {
            console.log('response', response);
        });
        // await db('users').insert(
        //     'id', 'campaign_name', 'date_created'
        // ).where({            
        //    user_id: req.params.id  //todo this will need to be based on logged in user
        // }).then(response => {
        //     res.json(response);
        // })
    } catch (err) {
        console.log('get error', err)
    }
}