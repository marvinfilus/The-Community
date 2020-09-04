var Rebase = require('re-base');
var firebase = require('firebase');
// require('firebase/auth');
var app = firebase.initializeApp({
    apiKey: "AIzaSyAeBX_FCX3gu-DY5GnYiT1ZQHPaZph5lVk",
    authDomain: "icgjc-b21c2.firebaseapp.com",
    databaseURL: "https://icgjc-b21c2.firebaseio.com",
    projectId: "icgjc-b21c2",
    storageBucket: "icgjc-b21c2.appspot.com",
    messagingSenderId: "1061238575458",
    appId: "1:1061238575458:web:6e87622ed1f973c8669c3b",
    measurementId: "G-KXDRYVSSCL"
  });

var base = Rebase.createClass(app.database());
export{ base , app }