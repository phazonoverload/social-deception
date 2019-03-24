import Vue from 'vue';
import VueFirestore from 'vue-firestore';
import firebase from 'firebase/app'
import 'firebase/firestore';

Vue.use(VueFirestore)

firebase.initializeApp({
  apiKey: "AIzaSyDoW5i6cc_UgWtp3Yk6ztT1dP2kZYNcAJA",
  authDomain: "axelrod-f5793.firebaseapp.com",
  databaseURL: "https://axelrod-f5793.firebaseio.com",
  projectId: "axelrod-f5793",
  storageBucket: "axelrod-f5793.appspot.com",
  messagingSenderId: "28702013970"
})

const db = firebase.firestore();

export { db }