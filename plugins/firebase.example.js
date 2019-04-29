import Vue from 'vue';
import VueFirestore from 'vue-firestore';
import firebase from 'firebase/app'
import 'firebase/firestore';

Vue.use(VueFirestore)

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
})

const db = firebase.firestore();

export { db }