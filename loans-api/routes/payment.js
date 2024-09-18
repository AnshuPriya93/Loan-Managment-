const express = require('express');
const router = express.Router();
const paymentModel = require('../models/payment.model')


router.post('/payment-add', async (req, res, next) => {
    try {
      const newPaymnet = new paymentModel(req.body);
      await newPaymnet.save();
      res.status(200).send({ message: 'User paymnet added successfully', PaymnetDetails: newPaymnet });
    } catch (error) {
      console.error('Error adding paymnet:', error); // Log the error correctly
      res.status(500).send({ message: 'Error adding paymnet', error: error.message }); // Send error response
    }
  });
/*---------------- GET All the paymnet----------------*/

router.get('/all', async (req, res, next) => {
  try {
    
    const paymnetRecord = await paymentModel.find();
    // console.log(paymnetRecord)
    const recordCount = paymnetRecord.length;
    res.send({ status: 200, recordCount: recordCount, result: paymnetRecord });
  }
  catch (err) {
    console.error('Error getting paymenet:', err); // Log the error
    res.send({ status: 500, message: 'Unable to fetch the paymnet data', error: err.message });
  }
});


  module.exports = router;