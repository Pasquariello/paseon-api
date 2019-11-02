
const db = require('../lib/Postgres').db();

const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');



// let email =  "taylor@pasq.net";


exports.userAuth = async function (req, res) {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    // console.log(req)
    const { username } = req.body;
    try {
        let user = await db('users').select('id', 'email').where({email: username});

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
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};

////