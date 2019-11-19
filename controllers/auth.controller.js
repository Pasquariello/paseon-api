
const db = require('../lib/Postgres').db();

const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');



// let email =  "taylor@pasq.net";


exports.userAuth = async function (req, res) {
    // const errors = validationResult(req);

    const { username } = req.body;
    try {
        let user = await db('users').select('*').where({email: username});

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

     // const isMatch = await bcrypt.compare(password, user.password);

    //   if (!isMatch) {
    //     return res
    //       .status(400)
    //       .json({ errors: [{ msg: 'Invalid Credentials' }] });
    //   }
        if (user.length == 0){
            return res
                  .status(400)
                  .json({ errors: [{ msg: 'Invalid Credentials' }] });
        } //TODO: IF user update count

      const payload = {
        user: {
          id: user[0].id
        }
      };

      let userData = user[0] 
      console.log('=========', user)

      console.log('=========', payload)

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, userData });
        }
      )
      
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};


exports.getUserInfo = async function (req, res) {
  const { id } = req.body;

  try {
    await db('users').select('*').where({            
      id: id  //todo this will need to be based on logged in user
    }).then(response => {
        res.json(response);
    })
  } catch (err) {
    console.log('get error', err)
  }
}

////