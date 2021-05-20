
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      var user = firebase.auth().currentUser;
     
      if(user != null){
        const h1 = document.getElementById("welcome");
        h1.innerHTML = `Welcome ${user.email}`;
      }
  
    } else {
        window.location = "/index.html";
    }
  });


function logOut(){
    firebase.auth().signOut();
    window.location = "/index.html";
}