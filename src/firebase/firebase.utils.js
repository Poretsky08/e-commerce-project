import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAVsUhN7_mzDltM00XA4vsZ_Vl5_fpGxBo",
  authDomain: "clothes-db-2ed94.firebaseapp.com",
  projectId: "clothes-db-2ed94",
  storageBucket: "clothes-db-2ed94.appspot.com",
  messagingSenderId: "137846267621",
  appId: "1:137846267621:web:a9c0ebb44d28aed096fe0c",
  measurementId: "G-E14K7W2ZWK"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;