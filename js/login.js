var email = document.getElementById ("email");
var password = document.getElementById ("password");


function acceder(){

    if (email.value == "" || password.value == ""){
         alert("Ingresar todos los campos");

    } else {

        localStorage.setItem("user-logged", email.value);
        window.location.href = "login.html";
    }

}
