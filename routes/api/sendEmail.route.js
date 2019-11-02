const express = require('express');
const router = express.Router();
const app = express();
console.log('made it to router')
// Require the controllers WHICH WE DID NOT CREATE YET!!
const sendEmail_controller = require('../../controllers/sendEmail.controller');

//@route GET /fish
//@desc test fish route
//@access Public
//  router.get('/', sendEmail_controller.landing);
router.post('/send', sendEmail_controller.sendEmail);
// router.post('/login', sendEmail_controller.login);

// router.post('/test', sendEmail_controller.recieved_post);



module.exports = router;
