const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    loanId: { type: String, required: true, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers', required: true },
    loanType: { type: String, required: true },
    installments: { type: Number, required: true },
    roi: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    pendingAmount: { type: Number, required: true },
    loanStatus: { type: String, required: true },
    date: { type: Date, default: Date.now },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanPlan' },
    
});

const LoanModel = mongoose.model('Loan', loanSchema);
module.exports = LoanModel;