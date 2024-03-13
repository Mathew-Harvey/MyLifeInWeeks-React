import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig';

const app = initializeApp(firebaseConfig);




export const firestore = getFirestore(app);