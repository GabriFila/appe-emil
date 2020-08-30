import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
import 'firebase/firestore';

// Firebase configuration
let firebaseConfig: any = {
  apiKey: 'AIzaSyD7O5PLahPpA7R-2FVzdxKv0NJoCbkV7r4',
  authDomain: 'appe-emil.firebaseapp.com',
  databaseURL: 'https://appe-emil.firebaseio.com',
  projectId: 'appe-emil',
  storageBucket: 'appe-emil.appspot.com',
  messagingSenderId: '683727025427',
  appId: '1:683727025427:web:b3154bf6a08548671d16e6'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();

export const auth = firebase.auth();
export const functions = firebase.app().functions('europe-west2');

if (window.location.hostname === 'localhost') {
  // functions.useFunctionsEmulator('http://localhost:5001');
}
