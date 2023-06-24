import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAnYSjQEuKnJ6lKZmpMt9Q6MVYd74lRaEQ',
  authDomain: 'tarefas-172ef.firebaseapp.com',
  projectId: 'tarefas-172ef',
  storageBucket: 'tarefas-172ef.appspot.com',
  messagingSenderId: '842087334160',
  appId: '1:842087334160:web:4fa0b5d815d600a59fe595',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
