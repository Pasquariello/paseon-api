const express = require('express');
const router = express.Router();
const app = express();
console.log('made it to register router')

const register_controller = require('../../controllers/register.controller');

router.post('/', register_controller.register_user );

module.exports = router;
