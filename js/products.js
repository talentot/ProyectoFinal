let currentProductsArray = [];
let currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_SOLD_COUNT = "Cant.";

function sortProducts(criteria, array){
    let result = [];
    console.log(array);
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
//Redireccion al escuchar el evento onclick hacia la iformacion de cada producto
function setProdID(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}
//Fin

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
             ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){
            
            htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                    <div class="col-3">
                    <img src="${product.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            
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
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

document.getElementById("FilterCost").addEventListener("click", function(){
        
    minCost = document.getElementById("MinCost").value;
    maxCost = document.getElementById("MaxCost").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
        minCost = parseInt(minCost);
    }
    else{
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
        maxCost = parseInt(maxCost);
    }
    else{
        maxCost = undefined;
    }

    showProductsList();
});

document.getElementById("clearFilter").addEventListener("click", function(){
    document.getElementById("MinCost").value = "";
    document.getElementById("MaxCost").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList();
});


document.addEventListener("DOMContentLoaded", function(){
    var id = localStorage.catID;
    getJSONData(PRODUCTS_URL + id + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
                currentProductsArray = resultObj.data.products
                showProductsList()
            //sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        } 

    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

});

