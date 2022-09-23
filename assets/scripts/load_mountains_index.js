"use strict"


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

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function arrayNumberNoRepeat(){
    let numbers = new Set();
    let number=0;
    while(numbers.lenght===6){
        numbers.add(random(0, mountainsArray.length))
    }
    return number;
}



