const express = require('express');

const app = express();
const { geocoder, carrier, timezones, parsePhoneNumberFromString } = require('@devmehq/phone-number-validator-js')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.post('/phoneNumberValidator', (req, res) => {
  let phoneNumberList = req.body;
  let returnData = [];
  for (let i = 0; i < phoneNumberList.length; i++) {
    const phoneNumber = phoneNumberList[i];
    const fixedLineNumber = parsePhoneNumberFromString(phoneNumber)
    const locationEN = geocoder(fixedLineNumber)
    const carrierEN = carrier(fixedLineNumber)
    let phoneCheckData ={
      ...fixedLineNumber,
      location:locationEN,
      carrier:carrierEN
    }
    returnData.push(phoneCheckData);
  }

  res.send(returnData);
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));