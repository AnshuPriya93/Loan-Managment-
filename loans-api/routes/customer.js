const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer.model')



/*------------- Create new customer----------------------*/

router.post('/add', async (req, res, next) => {
  try {
    const newCustomer = new customerModel(req.body);
    await newCustomer.save();
    res.status(200).send({ message: 'User added successfully', customerDetails: newCustomer });
  } catch (error) {
    console.error('Error adding customer:', error); // Log the error correctly
    res.status(500).send({ message: 'Error adding customer', error: error.message }); // Send error response
  }
});

  //----------- old way to make it dynamic----------//

  // let customerId = req.body.customerId;
  // let firstName = req.body.firstName;
  // let lastName = req.body.lastName;
  // let emailAddress = req.body.emailAddress
  // let phoneNumber = req.body.phoneNumber
  // let address = req.body.address
  // let department = req.body.department
  // try {
  //   let customerObj = new customerModel({
  //      customerId: customerId,
  //     firstName: firstName,
  //     lastName: lastName,
  //     phoneNumber: '0912345634',
  //     emailAddress: emailAddress,
  //     address: address,
  //     department: department,
  //   });
  //   const savedCustomer = await customerObj.save();
  //   res.send({ status: 200, message: 'User added successfully', customerDetails: savedCustomer });
  // }
  // catch (err) {
  //   console.error('Error adding customer:', err); // Log the error
  //   res.send({ status: 500, message: 'Unable to add the customer', error: err.message });
  // } 




/*---------------- GET All the customer----------------*/

router.get('/list', async (req, res, next) => {
  try {
    const customerRecord = await customerModel.find();
    const recordCount = customerRecord.length;
    res.send({ status: 200, recordCount: recordCount, result: customerRecord });
  }
  catch (err) {
    console.error('Error getting customer:', err); // Log the error
    res.send({ status: 500, message: 'Unable to fetch the customer', error: err.message });
  }
});


/*---------------- GET the customer by ID-----------------*/

router.get('/:id', async (req, res, next) => {
  try {
    const customerResponse = await customerModel.findById(req.params.id);
    const recordCount = customerResponse.length;
    res.send({ status: 200, recordCount: recordCount, result: customerResponse });
  }
  catch (err) {
    console.error('Error getting customer:', err); // Log the error
    res.send({ status: 500, message: 'Unable to fetch the customer', error: err.message });
  }
});


/* update existing customer*/
router.put('/update/:id', async (req, res, next) => {
  try {
    const customer = await customerModel.findById({ _id: req.params.id });
    if (customer) {
      // if we want multiple update in one go examp update all docuyment of Dept :CRM instand of ging id
      //await customerModel.update({'dept':'CRM'})
      const newData = await customerModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
      res.send({ status: 200, message: "Role updated", result: newData });
    } else {
      return res.status(400).send("Role not Found")
    }
  }
  catch (err) {
    console.error('Error getting customer:', err); // Log the error
    res.send({ status: 500, message: 'Unable to fetch the customer', error: err.message });
  }
});

/* delete new customer*/
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const customer = await customerModel.findById({ _id: customerId });
    if (customer) {
      await customerModel.findByIdAndDelete(customerId);
      return res.status(200).send("Customer is deleted!!!")
    } else {
      return res.status(400).send("Customer not Found")
    }
  } catch {
    return res.status(500).send("Internal server Error!")
  }
});


/* --------------delete muiltpler customer------------*/

router.delete('/delete-multiper', async (req, res, next) => {
  try {
    const customerId = req.params.id;
    // const customer = await customerModel.del({ _id: customerId });
    // if (customer) {
    await customerModel.deleteMany({ 'firstName': req.body.firstName });
    return res.status(200).send("Customers is deleted!!!")
    // } else {
    //   return res.status(400).send("Customer not Found")
    // }
  } catch {
    return res.status(500).send("Internal server Error!")
  }
});



/* search*/
router.get('/search', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
