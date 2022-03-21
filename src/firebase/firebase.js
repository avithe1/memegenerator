import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import firebaseConfig  from '../config/firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };