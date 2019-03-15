import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { decodeQuery } from './utils';


firebase.initializeApp({
  apiKey: "AIzaSyBcGAj_7smn3OuiXjxiPlX1nIxbu7663yQ",
  authDomain: "ramsai-web.firebaseapp.com",
  databaseURL: "https://ramsai-web.firebaseio.com",
  projectId: "ramsai-web",
  storageBucket: 'ramsai-web.appspot.com',
  messagingSenderId: "978996784553",
});


const auth = firebase.auth();
const firestore = firebase.firestore();


// Global collections
/** @type firebase.firestore.CollectionReference */
export let users;
/** @type firebase.firestore.CollectionReference */
export let votes;

export const Helpers = firebase.firestore;


export const init = () => firestore.enablePersistence()
.catch((err) => {
  if (err.code === 'failed-precondition')
    console.warn('Failed to initialize caching because multiple sessions are open');
  else
    console.error(err);
})
.then(new Promise((resolve) => {
  const unsubscribe = auth.onAuthStateChanged(() => {
    unsubscribe();
    resolve();
  }, (err) => {
    console.error('Sign in error:', err);
    unsubscribe();
    resolve();
  });
}))
.then(() => {
  users = firestore.collection('users');
  votes = firestore.collection('votes');
});


export const getVotes = (cb) => {
  firestore.collection('votes')
  .get()
  .then(snapshot => cb(snapshot.docs.map(doc => doc.data())))
  
}

export const createVote = (data) => {
  data.time = Date.now();
  votes.add(data)
};

