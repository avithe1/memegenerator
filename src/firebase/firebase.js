import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import firebaseConfig  from '../config/firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();
var settings = { timestampsInSnapshots: true }; // force Timestamp object instead of Date
firestore.settings(settings);

const db = firebaseApp.firestore();
export { db };