import Vue from 'vue';
import VueFirestore from 'vue-firestore';
import firebase from 'firebase/app'
import 'firebase/firestore';

Vue.use(VueFirestore)

firebase.initializeApp({
  apiKey: "AIzaSyDHggS1MXmkL7GL-K3LByGolm95PWHxvPI",
  authDomain: "deceptr.firebaseapp.com",
  databaseURL: "https://deceptr.firebaseio.com",
  projectId: "deceptr",
  storageBucket: "deceptr.appspot.com",
  messagingSenderId: "1038285347526"
})

const db = firebase.firestore();

export { db }



/* <script src="https://www.gstatic.com/firebasejs/5.8.2/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDHggS1MXmkL7GL-K3LByGolm95PWHxvPI",
    authDomain: "deceptr.firebaseapp.com",
    databaseURL: "https://deceptr.firebaseio.com",
    projectId: "deceptr",
    storageBucket: "deceptr.appspot.com",
    messagingSenderId: "1038285347526"
  };
  firebase.initializeApp(config);
</script> */