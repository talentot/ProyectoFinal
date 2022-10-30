var comentarios = [];
var producto = [];
var related = [];


/*Visualizacion de la infromacion de cada producto*/
function showProductsInfo() {

    document.getElementById("nombre").innerHTML = producto.name;

    let prodImgsHTML = imagesProduct(); //Mostrar imagenes

    let htmlContentToAppend = `
    <div class="row p-4 mb-4">
     <div class="col d-flex justify-content-around">
         
            <p class="mb-1">${producto.description}</p>
              
            <p> ${producto.currency} ${producto.cost}</p>
            
            <p>${producto.soldCount}</p>

            <button class="btn btn-secondary" type="button" onclick="location.href='cart.html'">Comprar</button>
       </div>     
    </div>
       
    <div>
        <div class="contenedor_img">${prodImgsHTML}</div>
    </div>`

    document.getElementById("product-info").innerHTML = htmlContentToAppend;
    
}

{/* Codigo anterior 
<div class="row">

<hr>

<h4>Descripción</h4>
<p class="mb-1">${producto.description}</p>

<h4>Costo</h4>
<p> ${producto.currency} ${producto.cost}</p>

<h4>Vendidos</h4>
<p>${producto.soldCount}</p> */}

/*Fin*/

/* Funcion para mostrar las imagenes*/
 function imagesProduct(){
    let htmlContentToAppend = "";
    for(let i = 0; i < producto.images.length; i++){
        let image = producto.images[i];
        htmlContentToAppend += `
            <div>
                <img src="${image}" class="img-thumbnail">
            </div>
            `
    }
    return htmlContentToAppend;
};
/*Fin */

/*Mostrar la puntuacion con estrellas*/
function loadScore(score){
    let maxScore = 5;
    let scoreHTML = "";

    for(let i=0; i < score; i++){
        scoreHTML += `<span class="fa fa-star checked"></span>`
        
    }

    let emptyStars = maxScore - score;
    

    for(let i=0; i < emptyStars; i++){
        scoreHTML += `<span class="fa fa-star"></span>`
    }

    return scoreHTML;
}
/*Fin*/

/*Mostrar los comentarios con su respectiva puntuacion */
function Comment(id, user, dateTime, score, description){
    let scoreHTML = loadScore(score);

    return `
        <div id="idComment_`+id+`" class="row comment">
            <div>
                <h6>`+user+` - `+dateTime+`</h6>
            </div>
            <div id="score">${scoreHTML}</div>
            
            <p>`+description+`</p>

            <div>
        </div>
        `;
}

function commentProduct(){
    let commentsHTML = ""
    for (let i = 0; i < comentarios.length; i++) {
        let commentInfo = comentarios[i];
        commentsHTML += Comment (i,commentInfo.user,commentInfo.dateTime,commentInfo.score,commentInfo.description);
    }
    document.getElementById("productComment").innerHTML = commentsHTML;
}
/*Fin*/

/*Funcion para mostrar productos relacionados*/
function relatedProdID(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

function showRelatedProducts(){

    let htmlContentToAppend = "";

    for (let i = 0; i < related.length; i++) {
        let relatedProd = related[i];

    htmlContentToAppend += `

        <div onclick="relatedProdID(${relatedProd.id})" class="group-item-action cursor-active relProd">
            <div>
                <img src="${relatedProd.image}" class="img-thumbnail">
            </div>

            <h6 class="mb-1">${relatedProd.name}</h6>

            <p> ${relatedProd.currency} ${relatedProd.cost}</p>
        </div>`
    }
document.getElementById ("relatedProductsImg").innerHTML = htmlContentToAppend;
    }
    
 /*Fin*/
    

document.addEventListener("DOMContentLoaded", function(){
    var catId = localStorage.catID;
    var prodId = localStorage.prodID;
    
    if(prodId && catId){
        getJSONData(PRODUCTS_URL + catId + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){ 
            related = resultObj.data.products.filter(prod => prod.id != prodId) //expresion lambda
            showRelatedProducts()
        } 
        })
        getJSONData(PRODUCT_INFO_URL + prodId + ".json").then(function(resultObj){
            if (resultObj.status === "ok"){
                    producto = resultObj.data;
                    showProductsInfo();
            
            }
        })
        getJSONData(PRODUCT_INFO_COMMENTS_URL + prodId + ".json").then(function(resultObj){
            if (resultObj.status === "ok"){
                    comentarios = resultObj.data;
                    commentProduct();
            
                }
        })
    }
});