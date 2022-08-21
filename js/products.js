//Función que se ejecuta una vez que se haya lanzado el evento de
//el documento que se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            //console.log (resultObj.data)
                currentProductsArray = resultObj.data
                showProductsList()
            //sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        } /*else{
            alert("error" + resultObj.data)
        }*/

    });

});

//PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
//pinte en la consola la URL y me daba un error, y al agregarle el 101.json
//me devuelve el objeto con el que voy a trabajar


let currentProductsArray = [];

// Se muestra la lista de productos, utilizando un fragmento del codigo
//extraido de categories.js, cambindo ciertos parametros y agregando 
//algunos solicitados en la propuesta como (cost, currency y soldCount).

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.products.length; i++){
        let product = currentProductsArray.products[i];
    
            htmlContentToAppend += `
            <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                    <div class="col-3">
                    <img src="${product.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <p> ${product.currency} ${product.cost}</p>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        }
        
        
        document.getElementById("product-list").innerHTML = htmlContentToAppend;
    }


