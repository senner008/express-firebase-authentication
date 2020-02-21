
import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from "../configs/client-config.js";

firebase.initializeApp(config);

export const auth = firebase.auth

export default firebase;
