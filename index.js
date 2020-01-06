require('dotenv').config();

// Set up the firebase config
var firebase = require('firebase').initializeApp({
  serviceAccount: './Hooha-b48dd17953fd.json',
  databaseURL: 'https://hooha-f4833.firebaseio.com'
});

var ref = firebase.database().ref().child('Invites');

ref.on('value', function(snap) {
  var text = "This is my test twillo_firebase application";
  for (var obj of Object.values(snap.val())[0]) {
    var number = obj.number.replace('us', '+1');
    sendSMS(number, text);
    // console.log(number);
  }
});

// Set up the twilio config.
var client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function sendSMS(cellNumber, text) {
  client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: cellNumber,
    body: text,
  }, (err, message) => {
    if(err) {
      console.error("Error : ", err.message);
    }
    // console.log(message);
  });
}