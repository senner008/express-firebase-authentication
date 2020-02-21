
async function makeCall(path, payload, authorization = "") {

    const jsonHeader = {
        'Content-Type': 'application/json'
    }
    const result = await fetch(path, {
        headers: {...jsonHeader, authorization},
        method: 'POST',
        body: JSON.stringify({data : payload})
    });
    if (result.status !== 200) {
        throw result.statusText;
    } else {
        return result.json();
    }
}

function toggleLoginStatus (status) {
    document.querySelector("span").innerHTML = status;
}

function showPriviligedContent (content) {
    document.querySelector("p").innerHTML = content;
}

document.querySelector(".login").addEventListener("click", async () => {

    const user = document.querySelector("form #user").value;
    const pass = document.querySelector("form #pass").value;

    try {
        var result = await makeCall(
            "login", 
            {user, pass}
        );
        if (result.error) throw result.error;
        localStorage.setItem('hyf-token', result.token.user.stsTokenManager.accessToken);
        toggleLoginStatus("User logged in!");
    }
    catch (err) {
        console.log(err);
        toggleLoginStatus(err.message);
    }
})

document.querySelector(".priviliged").addEventListener("click", async () => {
    var message = "";
    try {
        message = await makeCall(
            "auth", 
            "",
            `Bearer ${localStorage.getItem('hyf-token')}`
        );
        showPriviligedContent(message.body);
    }
    catch (err) {
        console.log(err)
    }
});