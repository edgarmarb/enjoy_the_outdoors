"use strict"


let inputMountain=document.querySelector("#inputFindMountain");
let selectMountain=document.querySelector("#mountainsData");
let divMountain=document.querySelector("#idDivContent")

let mountainsArray = [];

window.onload = function(){

    loadJsonData("assets/data/mountains.json").then((mountains) => {
        mountainsArray = mountains.mountains;
    })
}

//function that can "fetch" the sunset/sunrise times
let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}

function onChangeInput(){
    console.log('This is a test');
}

function findMountainInArray(sWord){
    let obj = mountainsArray.filter(o => o.name.toUpperCase().match(sWord.toUpperCase()));
    return obj;
}

function findMatchMountainInArray(sWord){
    let obj = mountainsArray.find(o => o.name.toUpperCase().match(sWord.toUpperCase()));
    return obj;
}


selectMountain.addEventListener("click",function(){
    console.log('This is a test2 '+selectMountain.value);

    mountainsArray.forEach(option =>
        selectMountain.add(
          new Option(option.name, option.name)
        )
      );
})

selectMountain.addEventListener("change",function(){
    let j=0;
    console.log('This is a test3 '+selectMountain.value);
    let divTitle=document.getElementById("idDivTitle");
    let divDesc=document.getElementById("idDivDesc");
    let image=document.getElementById("idImage");
    divTitle.innerHTML=selectMountain.value;
    document.getElementById("idDivContent").style.display = '';

    let mountainSelected=findMatchMountainInArray(selectMountain.value);

    
    image.setAttribute("src", `assets/images/mountains/${mountainSelected.img}`);
    image.setAttribute("alt", "Flower");
    

    divDesc.innerHTML=mountainSelected.desc;

    console.log(mountainSelected);

})

