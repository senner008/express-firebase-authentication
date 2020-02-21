
import * as firebase from 'firebase/app';
import {auth} from './firebase-service';
import makeCall from "./makeCall.js"

function toggleLoginStatus (status) {
    document.querySelector("span").innerHTML = status;
}

function showPriviligedContent (content) {
    document.querySelector("p").innerHTML = content;
}

var GLOBAL_USER;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      GLOBAL_USER = user;
    } else {
      GLOBAL_USER = null;
    }
 });
 
document.querySelector(".login").addEventListener("click", async () => {

    const user = document.querySelector("form #user").value;
    const pass = document.querySelector("form #pass").value;

    try {
        await auth().signInWithEmailAndPassword(user, pass);
        toggleLoginStatus("User logged in!");
    }
    catch (err) {
        console.log(err);
        toggleLoginStatus(err.message);
    }
})

document.querySelector(".priviliged").addEventListener("click", async () => {

    try {
        if (!GLOBAL_USER) {
            throw "not logged in!"
        }
        const token = await auth().currentUser.getIdToken();
        const message = await makeCall(
            "auth", 
            "",
            token
        );
        showPriviligedContent(message.body);
    }
    catch (err) {
        showPriviligedContent(err);
    }
});