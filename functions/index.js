const functions = require('firebase-functions');

//add in Express
// const express = require('express');
// const app = express();
// or on one line
const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllScreams, postOneScream } = require('./handlers/screams');

const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require('./handlers/users');

// const firebase = require('firebase');
// firebase.initializeApp(config);

//*************screams: get all screams route****************
//Get Http Request Document  Scream Routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);

//get without Express
// exports.getScreams = functions.https.onRequest((req, res) => {
//   admin
//     .firestore()
//     .collection('screams')
//     .get()
//     .then((data) => {
//       let screams = [];
//       data.forEach((doc) => {
//         screams.push(doc.data());
//       });
//       return res.json(screams);
//     })
//     .catch((err) => console.error(err));
// });
//*************screams: post one scream route****************
//Create Http Request Document Post one scream

//Create without Express
// exports.createScream = functions.https.onRequest((req, res) => {
//   if (req.method !== 'POST') {
//     return res.status(400).json({ error: 'Method not allowed' });
//   }
//   const newScream = {
//     body: req.body.body,
//     userHandle: req.body.userHandle,
//     createAt: admin.firestore.Timestamp.fromDate(new Date()),
//   };
//   admin
//     .firestore()
//     .collection('screams')
//     .add(newScream)
//     .then((doc) => {
//       res.json({ message: `document ${doc.id} created successfully` });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: 'something went wrong' });
//       console.error(err);
//     });
// });
//*************users: Signup route****************
app.post('/signup', signup);

//*************users: Login route****************
app.post('/login', login);
//***************users: UpdloadImage route********
app.post('/user/image', FBAuth, uploadImage);
app.post('user/', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
//exports.api = functions.region('europe-west1').https.onRequest(app)
exports.api = functions.https.onRequest(app);
