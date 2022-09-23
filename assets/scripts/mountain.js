let inputMountain=document.querySelector("#inputFindMountain");
let selectMountain=document.querySelector("#mountainsData");
let divMountain=document.querySelector("#idDivContent")

function onChangeInput(){
    console.log('This is a test');
}

//for filter a element for name, return an array
function findMountainInArray(sWord){
    let obj = mountainsArray.filter(o => o.name.toUpperCase().match(sWord.toUpperCase()));
    return obj;
}

//for find a element of array
function findMatchMountainInArray(sWord){
    let obj = mountainsArray.find(o => o.name.toUpperCase().match(sWord.toUpperCase()));
    return obj;
}

//load options for select
selectMountain.addEventListener("click",function(){
    console.log('This is a test2 '+selectMountain.value);

    mountainsArray.forEach(option =>
        selectMountain.add(
          new Option(option.name, option.name)
        )
      );
})

//load div content with info
selectMountain.addEventListener("change",function(){
    let j=0;
    console.log('This is a test3 '+selectMountain.value);
    let divTitle=document.getElementById("idDivTitle");
    
    let divRow=document.getElementById("idRow");
    let image=document.getElementById("idImage");

    divTitle.innerHTML=selectMountain.value;
    document.getElementById("idDivContent").style.display = '';

    let mountainSelected=findMatchMountainInArray(selectMountain.value);

    
    image.setAttribute("src", `assets/images/mountains/${mountainSelected.img}`);
    image.setAttribute("alt", "Flower");
    
    //remove others nodes
    while( divRow.hasChildNodes() ){
        divRow.removeChild(divRow.lastChild);
    }
    
    let divDesc=document.createElement('div');
    divDesc.setAttribute('id','idDivDesc');
    divRow.appendChild(divDesc);

    let br=document.createElement('br');
    divRow.appendChild(br);

    let href = document.createElement("a");
    href.setAttribute('class','btn btn-primary');
    href.setAttribute('target','_blank');
    href.innerHTML='View on Map';
    href.style.width='30%';
    divRow.appendChild(href);

    href.setAttribute('href',`https://www.google.com/maps/place/${mountainSelected.coords.lat},${mountainSelected.coords.lng}`)
    divDesc.innerHTML=mountainSelected.desc;

    console.log(mountainSelected);

})

