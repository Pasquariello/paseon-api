const express = require('express');
const router = express.Router();
const app = express();
console.log('made it to payment router')

const payment_controller = require('../../controllers/payment.controller');

router.post('/charge', payment_controller.charge );

module.exports = router;
