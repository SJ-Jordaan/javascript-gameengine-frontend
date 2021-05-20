let message = [];

function signUp() {
	document
		.getElementById("signUpForm")
		.addEventListener("submit", function (event) {
			event.preventDefault();
		});

	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password1 = document.getElementById("password1").value;
	const password2 = document.getElementById("password2").value;

	if (validateFields(name, email, password1, password2)) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password1)
			.then(async (userCredential) => {
				// Signed in
				var user = userCredential.user;
				const toast = document.getElementById("snackbar");
				toast.className = "show";
				toast.innerHTML = `successfully create user: ${userCredential.email}`;

				//TODO: Send to BACKEND
				console.log(userCredential.uid);
				console.log({
					username: name,
					uid: userCredential.uid,
				});
				fetch("https://game-engine-api.herokuapp.com/api/auth/signup", {
					method: "POST",
					body: JSON.stringify({
						username: name,
						uid: userCredential.uid,
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}).then((data) => {
					// Call login
					window.location = '/signin'
					console.log(data);
				}).catch((error)=>{

				});

				console.log(userCredential);
				await setTimeout(() => {
					toast;
					toast.className = toast.className.replace("show", "");
					// window.location = '/index.html'
				}, 4000);
				//firebase.auth().signOut();
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
				const toast = document.getElementById("snackbar");
				toast.className = "show";
				toast.innerHTML = `${errorMessage}`;
				// ..
			});
	}
	const toast = document.getElementById("snackbar");
	toast.className = "show";
	toast.innerHTML = `${message}`;
	setTimeout(() => {
		toast.className = toast.className.replace("show", "");
	}, 6000);
}
function validateFields(name, email, password1, password2) {
	message = [];
	let isValidated = true;
	if (name.length === 0) {
		message.push(" Enter name ");
		isValidated = false;
	}
	if (email.length === 0) {
		message.push(" Enter email address ");
		isValidated = false;
	}
	if (password1.length === 0 || password2.length === 0) {
		message.push(" Enter Password ");
		isValidated = false;
	}
	if (password1.length < 6) {
		message.push(" Password length must be greater than 6");
		isValidated = false;
	}
	if (!(password1 === password2)) {
		message.push(" Passwords must match ");
		return false;
	}

	return isValidated;
}
