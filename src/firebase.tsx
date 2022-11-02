// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCEQRgFv_gwcXwvR-S0LeWYeYD_r3HExyw',
  authDomain: 'nwitter-c9d34.firebaseapp.com',
  projectId: 'nwitter-c9d34',
  storageBucket: 'nwitter-c9d34.appspot.com',
  messagingSenderId: '314451318976',
  appId: '1:314451318976:web:02ebcc99189761a687f525',
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
