
import * as firebase from 'firebase/app';
import {auth} from './firebase-service';
import makeCall from "./makeCall.js"

function toggleLoginStatus (status) {
    document.querySelector(".login-status span").innerHTML = status;
}

function privateContent (content) {
    document.querySelector("p.private").innerHTML = content;
}

var USER_LOGGED_IN;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        USER_LOGGED_IN = true;
    } else {
        USER_LOGGED_IN = false;
    }
 });
 
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateCredentials (user, pass) {
    if (!validateEmail(user)) throw {message :"please provide a valid email" }
    if (!user || !pass) throw {message :"please provide login credentials" }
}

document.querySelector(".login").addEventListener("click", async (e) => {

    e.preventDefault();

    const user = document.querySelector("form #user").value;
    const pass = document.querySelector("form #pass").value;

    try {
        validateCredentials(user, pass);
        await auth().signInWithEmailAndPassword(user, pass);
        toggleLoginStatus("User logged in!");
    }
    catch (err) {
        toggleLoginStatus(err.message);
    }
});

document.querySelector(".logout").addEventListener("click", async () => {
    await auth().signOut();
    toggleLoginStatus("user logged out");
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