var envio = 0;

// Funcion para mostrar el articulo precargado
function showCartProduct(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let productos = array[i];

        htmlContentToAppend +=

            `<div class="row shadow p-4 mb-4 bg-white">
            <div class="col d-flex justify-content-around align-items-center">
                <img src="${productos.image}" class="img-thumbnail" width="120">
                    <p>${productos.name}</p>
                    <p> $ <span class="unitCost">${productos.unitCost}</span></p>
                    <input type="number" min="1" max="100" value="${productos.count}" onclick="calcularSubTotal()">
                    <p>USD<span id="subTotal"></span></p>
            </div>
        </div>`
    }

    document.getElementById('cartBuy').innerHTML = htmlContentToAppend;
}
// Fin

// Funcion que calcula el subtotal del producto precargado
function calcularSubTotal() {

    let costoProd = document.getElementsByClassName('unitCost');
    let cantProd = document.querySelectorAll("input");
    let subtotal = 0;
    let costoEnvio = 0;



    for (let i = 0; i < costoProd.length; i++) {
        if (isNaN(parseFloat(cantProd[i].value))) {
            subtotal = 0;
        } else {
            subtotal += parseFloat(costoProd[i].innerHTML) * parseFloat(cantProd[i].value);
        }
    }
    document.getElementById('subTotal').innerHTML = subtotal;
    document.getElementById('Cost').innerHTML = ` USD ${subtotal}`;
    costoEnvio = (subtotal * envio);
    document.getElementById('costEnvio').innerHTML = ` USD ${costoEnvio}`;
    document.getElementById('total').innerHTML = ` USD ${subtotal + costoEnvio}`;
}
// fin


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productos = resultObj.data;
            showCartProduct(productos.articles);
        };
        calcularSubTotal();

    });
    document.getElementById("Premium").addEventListener("change", function () {
        envio = 0.15;
        calcularSubTotal();
    });

    document.getElementById("Express").addEventListener("change", function () {
        envio = 0.07;
        calcularSubTotal();
    });

    document.getElementById("Standard").addEventListener("change", function () {
        envio = 0.05;
        calcularSubTotal();
    });
//Guardamos en el localStorage el mensaje para mostrarlo
    var successMsg = localStorage.getItem("modal-form-success-msg")

    if(successMsg !== undefined && successMsg !== "" && successMsg !== "undefined"){
        showAlertSuccess(successMsg)
        localStorage.removeItem("modal-form-success-msg")
    }
});

// Funciones para mostrar las formas de pago dentro del modal

var transf = document.getElementById('transfBancaria');
var credito = document.getElementById('tarjCredito');
var htmlContentToAppend  = "";


transf.addEventListener('change', function () {
    htmlContentToAppend = `
         <br>   
    <div class="col-md-9">

        <label for="transfBancaria">Nombre del destinatario</label>
        <input type="text" class="form-control"required>
        <div class="valid-feedback">Correcto</div>
        <div class="invalid-feedback">Ingresar nombre del Banco</div>

        <br>
    </div>

    <div class="col-md-9">

        <label for="transfBancaria">Nombre del banco</label>
        <input type="text" class="form-control"required>
        <div class="valid-feedback">Correcto</div>
        <div class="invalid-feedback">Ingresar nombre del Banco</div>
        <br>

    </div>

    <div class="col-md-9">

        <label for="transfBancaria">Cuenta bancaria</label>
        <input type="number" class="form-control" required>
        <div class="valid-feedback">Correcto</div>
        <div class="invalid-feedback">Ingresar numero de cuenta</div>

    </div>  
  `

    document.getElementById('FormaDePago').innerHTML = htmlContentToAppend;

})

credito.addEventListener('change', function () {

    htmlContentToAppend = `
    <br>
    <div class="col-md-9">
        
        <label for="tarjCredito">Número de Tarjeta</label>
        <input type="number" class="form-control" required>
        <div class="valid-feedback">Correcto</div>
        <div class="invalid-feedback">Ingresar el numero de la tarjeta</div>

    </div>
        <br>
    <div class="col-md-9">

        <label for="tarjCredito">Vencimiento (MM/AA)</label>
        <input type="date" class="form-control" required>
        <div class="valid-feedback">Correcto</div>
        <div class="invalid-feedback">Ingresar el vencimiento</div>

    </div>
         <br>
    <div class="col-md-9">

        <label for="tarjCredito">Còdigo de seg</label>
        <input type="number" class="form-control" required>
        <div class="valid-feedback">Correcto</div>
        <div class="invalid-feedback">Ingresar el codigo de seguridad</div>

    </div>`
    document.getElementById('FormaDePago').innerHTML = htmlContentToAppend;
});
// Fin del modal


//Validar compra y formas de pago
(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')
    var Transferencia = document.getElementById('transfBancaria');
    var Credito = document.getElementById('tarjcredito');
    var InputP = document.getElementById('Premium');
    var InputE = document.getElementById('Express');
    var InputSta = document.getElementById('Standard');
    
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {

                if (!form.checkValidity() || Transferencia.checked == false && Credito.checked == false 
                ||  InputP.checked ==  false &&  InputE.checked ==  false  && InputSta.checked ==  false) {

                    event.preventDefault()
                    event.stopPropagation()
                    
                    alert('Faltan completar campos o no ha seleccionado tipo de envio')
                }

                form.classList.add('was-validated');

                if (form.checkValidity() && (Transferencia.checked == true || Credito.checked == true) &&
                    (InputP.checked ==  true ||  InputE.checked ==  true  || InputSta.checked ==  true)) {

                    //    Mostrar el mensaje que la compra se realizo con exito llamando al JSON 
                        getJSONData(CART_BUY_URL).then(function (resultObj) {
                            if (resultObj.status === "ok") {

                            localStorage.setItem("modal-form-success-msg", resultObj.data.msg);
                            // console.log(resultObj.data.msg)

                            }
                        })      
                }
            }, false)
        })
})()
// Fin de validacion

//Funcion para mostrar la alerta exitosa con el recuadro verde
function showAlertSuccess(msg) {
    if(msg !== "" && msg !== undefined){

        document.getElementById("alter-success-msg").innerHTML= msg
    }
    
	document.getElementById("alert-success").classList.add("show");
}
// Fin de la alerta