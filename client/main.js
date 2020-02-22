
import * as firebase from 'firebase/app';
import {auth} from './firebase-service';
import makeCall from "./makeCall.js"

function toggleLoginStatus (status) {
    document.querySelector("span").innerHTML = status;
}

function privateContent (content) {
    document.querySelector("p").innerHTML = content;
}

var USER_LOGGED_IN;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        USER_LOGGED_IN = true;
    } else {
        USER_LOGGED_IN = false;
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

document.querySelector(".private").addEventListener("click", async () => {

    try {
        if (!USER_LOGGED_IN) {
            throw "not logged in!"
        }
        const token = await auth().currentUser.getIdToken();
        const message = await makeCall(
            "auth", 
            "",
            token
        );
        privateContent(message.body);
    }
    catch (err) {
        privateContent(err);
    }
});