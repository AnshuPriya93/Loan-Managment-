const express = require('express');
const router = express.Router();
const LoanModel = require('../models/loans.model')
const CustomerModel = require('../models/customer.model'); 
const loanPlanModel = require('../models/loan-plan.model')

router.post('/loan-add', async (req, res, next) => {
    try {
      const newLoan = new LoanModel(req.body);
      await newLoan.save();
      res.status(200).send({ message: 'User Loan added successfully', LOanDetails: newLoan });
    } catch (error) {
      console.error('Error adding loan:', error); // Log the error correctly
      res.status(500).send({ message: 'Error adding loan', error: error.message }); // Send error response
    }
  });

 /*---------------- GET All the customer----------------*/

router.get('/all', async (req, res, next) => {
  try {
    
    const loanRecord = await LoanModel.find();
    console.log(loanRecord)
    const recordCount = loanRecord.length;
    res.send({ status: 200, recordCount: recordCount, result: loanRecord });
  }
  catch (err) {
    console.error('Error getting loan:', err); // Log the error
    res.send({ status: 500, message: 'Unable to fetch the loans data', error: err.message });
  }
});




  module.exports = router;