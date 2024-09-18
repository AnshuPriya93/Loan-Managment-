const express = require('express');
const router = express.Router();
const LoanPlanModel = require('../models/loan-plan.model')
const CustomerModel = require('../models/customer.model'); 

router.post('/loanPlan-add', async (req, res, next) => {
    try {
      const newLoanPlan = new LoanPlanModel(req.body);
      await newLoanPlan.save();
      res.status(200).send({ message: 'User LoanPlan added successfully', LoanPlanDetails: newLoanPlan });
    } catch (error) {
      console.error('Error adding loan Plan:', error); // Log the error correctly
      res.status(500).send({ message: 'Error adding loan plan', error: error.message }); // Send error response
    }
  });
  module.exports = router;