document.addEventListener("DOMContentLoaded", function(){
    /*       ----------------------------------               */
    let User = localStorage.getItem("user-logged");
    document.getElementById('nav-User').innerHTML = User;
    /*       ----------------------------------               */

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});