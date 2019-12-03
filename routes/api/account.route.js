const express = require('express');
const router = express.Router();
const app = express();
console.log('made it to account router')

const account_controller = require('../../controllers/account.controller.js');

router.get('/get_user_acct/:id', account_controller.getUser);
router.post('/reset_password', account_controller.resetUserPassword);

module.exports = router;
