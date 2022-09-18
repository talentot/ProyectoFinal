var comentarios = [];
var producto = [];


/*Visualizacion de la infromacion de cada producto*/
function showProductsInfo() {

    document.getElementById("nombre").innerHTML = `
        <h3 class="text-center mt-4 mb-5">${producto.name}</h3>
        `;

    let prodImgsHTML = imagesProduct(); //Mostrar imagenes

    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <div class="row">

            <hr>

            <h4>Descripción</h4>
            <p class="mb-1">${producto.description}</p>
            
            <h4>Costo</h4>
            <p> ${producto.currency} ${producto.cost}</p>
            
            <h4>Vendidos</h4>
            <p>${producto.soldCount}</p>
            
            <h4>Imagenes</h4>
            <div class="contenedor_img">${prodImgsHTML}</div>

            </hr>

        </div>`

    document.getElementById("product-info").innerHTML = htmlContentToAppend;
    
}
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
        <li id="idComment_`+id+`" class="row comment-content">
        <div>
        <h5>`+user+` - `+dateTime+`</h5>
        </div>
        <div id="score">${scoreHTML}</div>
        <p>`+description+`</p>
        </li>`;
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

document.addEventListener("DOMContentLoaded", function(){
    var id = localStorage.prodID;
    if(id){
        getJSONData(PRODUCT_INFO_URL + id + ".json").then(function(resultObj){
            if (resultObj.status === "ok"){
                    producto = resultObj.data;
                    showProductsInfo();
            
            }
        })
        getJSONData(PRODUCT_INFO_COMMENTS_URL + id + ".json").then(function(resultObj){
            if (resultObj.status === "ok"){
                    comentarios = resultObj.data;
                    commentProduct();
            
                }
        })
    }
});