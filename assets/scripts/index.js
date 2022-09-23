

let actualPage=1;
let pages;

document.addEventListener('DOMContentLoaded', ()=>{
    //when the page is ready
    getMountains( showPicsMountains, errorMessage );

});

function getMountains(success, failure){
    //request the list of products from the "server"
    const URL = "assets/data/mountains.json?";
    fetch(URL, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response=>response.json())
    .then(showPicsMountains)
    .catch(err=>{
        errorMessage(err.message);
    });
}


function showPicsMountains( mountainObject ){

    console.log(mountainObject.mountains);
    console.log(mountainObject.mountains.length)

    mountainObject.mountains.forEach(product=>{
        console.log(product)
    });


    //init images of mountains with paginator
    initGalery(mountainObject, 6, 1);

    let paginatorGalery=document.getElementById("paginationGalery");
    pages=Math.ceil(mountainObject.mountains.length/6);

    //load buttons for paginator
    for(let i=0; i<pages;i++){
        
        let liPaginator = document.createElement("li");
        if(i+1===actualPage){
            liPaginator.setAttribute('class', 'page-item active');
        }else{
            liPaginator.setAttribute('class', 'page-item');
        }
        
    
        let link = document.createElement("a");
        link.setAttribute('class', 'page-link');
        link.innerHTML=i+1;
        liPaginator.appendChild(link);
        paginatorGalery.appendChild(liPaginator);
    }

    //load button Next
    let liPaginator = document.createElement("li");
    liPaginator.setAttribute('class', 'page-item');

    let link = document.createElement("a");
    link.setAttribute('class', 'page-link');

    let span = document.createElement("span");
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML='&raquo;';

    let span1 = document.createElement("span");
    span1.setAttribute('class', 'sr-only');
    span1.innerHTML='Next';
    link.appendChild(span);
    link.appendChild(span1);

    liPaginator.appendChild(link);
    paginatorGalery.appendChild(liPaginator);


    //active events when to click on the some button
    listenClicksButtons(mountainObject);
    listenOnmouseOver();
}

function initGalery(mountainObject, size, page){
    let divGalery=document.getElementById("galeryImg");
    let arrayPaginator=paginate(mountainObject.mountains, size, page);
    let list = document.querySelectorAll(".page-item");

    //show the button active
    for(let i=0; i<list.length; i++){
        if(i===page){
            list[i].setAttribute('class', 'page-item active');
        }else{
            list[i].setAttribute('class', 'page-item');
        }
    }

    //clear de images if there were any
    while( divGalery.hasChildNodes() ){
        divGalery.removeChild(divGalery.lastChild);
    }
    //create images from galery
    arrayPaginator.forEach(mount=>{
        let divImage = document.createElement("div");
        divImage.setAttribute("class","col-lg-4 col-md-6 col-sm-12");
        let image = document.createElement("img");
        image.setAttribute('src',`assets/images/mountains/${mount.img}`)
        image.setAttribute('alt',mount.img);
        image.setAttribute('class','rounded');
        divImage.appendChild(image);
        divGalery.appendChild(divImage);
    });
}

//listen buttons and action
function listenClicksButtons(mountainObject) {
    list = document.querySelectorAll(".page-link");
    for (var i = 0; i < list.length; i++) {
      
      list[i].addEventListener("click", function (e) {
          e.preventDefault();
          console.log('le dio click '+e.target.innerHTML);
          if(!isNaN(e.target.innerHTML)){
            actualPage=Number(e.target.innerHTML);            
            initGalery(mountainObject, 6, actualPage);
          }else{
            if(e.target.innerHTML==='Previous' && actualPage!==1){                
                initGalery(mountainObject, 6, --actualPage);
            }else if(e.target.innerHTML==='Next' && actualPage<pages){                
                initGalery(mountainObject, 6, ++actualPage);                
            }
          }
          listenOnmouseOver();
      });
    }
}

//listen buttons and action
function listenOnmouseOver() {
    list = document.getElementsByTagName("img");
    for (var i = 0; i < list.length; i++) {
      
      list[i].addEventListener("click", function (e) {
          e.preventDefault();
          console.log('le dio click '+e.target.alt);
          
      });
    }
}

//use this function for paginator
const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}




function errorMessage(err){
    //display the error message to the user
    console.log(err);
}