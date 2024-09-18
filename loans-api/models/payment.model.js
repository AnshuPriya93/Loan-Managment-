const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentId: { type: String, required: true, unique: true },
    loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
