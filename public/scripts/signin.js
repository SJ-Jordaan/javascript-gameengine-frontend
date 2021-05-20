// import 'js-loading-overlay'
// JsLoadingOverlay.show({'spinnerIcon': 'triangle-skew-spin'});
let message = [];
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        let user = firebase.auth().currentUser;

        if (user != null) {
            var email_id = user.uid;
            console.log(`assigned in is: ${email_id}`);
            window.location = "/welcome.html";
        }
    } else {
        const toast = document.getElementById("snackbar");
        toast.className = "show";
        toast.innerHTML = "Sign in.";
        setTimeout(() => {
            toast;
            toast.className = toast.className.replace("show", "");
        }, 4000);
    }
});

function logIn() {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });

    const userEmail = document.getElementById("username").value;
    const userPassword = document.getElementById("password").value;

    if (validateFields(userPassword, userEmail)) {
        firebase
            .auth()
            .signInWithEmailAndPassword(userEmail, userPassword)
            .then((userCredential) => {
                // Signed in
                fetch("https://game-engine-api.herokuapp.com/api/auth/signin", {
                    method: "POST",
                    body: JSON.stringify({
                        uid: userCredential.uid,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }).then((data) => {
                    console.log(data);
                });
                const user = userCredential.user;

                console.log(`Successfully signed in user details: ${user}`);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(`Error: ${errorMessage} status: ${errorCode}`);

                const toast = document.getElementById("snackbar");
                toast.className = "show";
                toast.innerHTML = `${errorMessage}`;
                setTimeout(() => {
                    toast.className = toast.className.replace("show", "");
                }, 5000);
            });
    }
    const toast = document.getElementById("snackbar");
    toast.className = "show";
    toast.innerHTML = `${message}`;
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 5000);
}
function validateFields(password, email) {
    message = [];
    let isValidated = true;
    if (password.length === 0) {
        message.push("Enter Password");
        isValidated = false;
    }
    if (password.length < 6) {
        message.push(" Password length must be greater than 6 ");
        isValidated = false;
    }

    if (email.length === 0) {
        message.push(" Enter email address ");
        isValidated = false;
    }

    return isValidated;
}
