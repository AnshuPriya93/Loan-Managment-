const mongoose = require('mongoose');

const loanPlanSchema = new mongoose.Schema({
    planId: { type: String, required: true, unique: true },
    planName: { type: String, required: true },
    interestRate: { type: Number, required: true },
    termLength: { type: Number, required: true }, // in mon
    
});

const LoanPlanModel = mongoose.model('LoanPlan', loanPlanSchema);
module.exports = LoanPlanModel;