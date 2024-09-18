const mongoose = require('mongoose');

// dob: { type: String, required: true },
const customerSchema = mongoose.Schema({
     customerId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    address: { type: String, required: true },
    department: { type: String, required: true },
})
const CustomerModel = mongoose.model('Customers', customerSchema);
module.exports = CustomerModel;