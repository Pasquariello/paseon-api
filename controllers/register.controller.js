const db = require('../lib/Postgres').db();
const config = require('config');
const crypto = require('crypto')



exports.register_controller = async function (req, res){
    console.log('hit register controllor!')

    try {
        console.log('try')
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