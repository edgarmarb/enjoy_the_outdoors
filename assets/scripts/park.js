let inlineRadio1=document.querySelector("#inlineRadio1");
let inlineRadio2=document.querySelector("#inlineRadio2");
let inlineRadio3=document.querySelector("#inlineRadio3");
let divTag=document.querySelector("#idTag");
let selectPark=document.querySelector("#parksData");
let optionActive=1;
let divContent=document.querySelector("#idDivContent");
let parkSelected;

//find a element with two criteria, state and locationName
function findParkInArray(sWord, option){
    let obj;
    if(option===1){        
        obj= nationalParksArray.filter(o => o.State.toUpperCase().match(sWord.toUpperCase()));
    }else{
        obj= nationalParksArray.filter(o => o.LocationName.toUpperCase().match(sWord.toUpperCase()));
    }

    return obj;
}

//init array of parks and delete cards on the DOM
function initValues(actionValue){
    
    document.getElementById("parksData").style.display = actionValue;    
    let options = selectPark.getElementsByTagName('option');

    for (var i=options.length; i--;) {
        selectPark.removeChild(options[i]);
    }

    selectPark.add(
        new Option('Choose One...', 'Choose One...')
    )

    initDivInfo();
}

function initDivInfo(){
    while( divContent.hasChildNodes() ){
        divContent.removeChild(divContent.lastChild);
    }
}

/**
 * In 3 listener set optionActive a value, for after find parks for a specific criteria
 */


//listener when change the radio of location, init the options from json locations
inlineRadio1.addEventListener("change",function(){
    console.log("inlineRadio1");
    initValues('');
    locationsArray.forEach(option =>
        selectPark.add(
          new Option(option, option)
        )
    );
    optionActive=1;
});

//listener when change the radio of type, init the options from json parks types
inlineRadio2.addEventListener("change",function(){
    console.log("inlineRadio2");
    initValues('');
    parkTypesArray.forEach(option =>
        selectPark.add(
          new Option(option, option)
        )
    );
    optionActive=2;
});

//listener when change the radio of View all, hiden some divs and show all parks
inlineRadio3.addEventListener("change",function(){
    console.log("inlineRadio3");
    initValues('none');
    optionActive=3;
    showParks(nationalParksArray);
});

//create cards
function showParks(parks){
    document.getElementById("idDivContent").style.display = '';
    divContent.setAttribute("class","d-flex flex-wrap justify-content-center");
    for (let i=0; i<parks.length; i++) {        
        let divPrincipal = document.createElement("div");

        divPrincipal.setAttribute("class", "card p-2 m-1");//card p-2 m-1
        divPrincipal.style.width="18rem";
        divContent.appendChild(divPrincipal);        

        let h5=document.createElement("h5");
        h5.setAttribute("class","card-title");
        divPrincipal.appendChild(h5);

        let p=document.createElement("p");
        p.setAttribute("class","card-text");
        divPrincipal.appendChild(p);

        let divRow = document.createElement("div");
        divRow.setAttribute('class','row');

        let divPhone = document.createElement("div");
        divPhone.setAttribute('class','col');
        divPhone.innerHTML='Phone';
        divRow.appendChild(divPhone);

        let divFax = document.createElement("div");
        divFax.setAttribute('class','col');
        divFax.innerHTML='Fax';
        divRow.appendChild(divFax);

        divPrincipal.appendChild(divRow);

        let divRowV = document.createElement("div");
        divRowV.setAttribute('class','row pb-2');

        let divPhoneV = document.createElement("div");
        divPhoneV.setAttribute('class','col');
        divRowV.appendChild(divPhoneV);

        let divFaxV = document.createElement("div");
        divFaxV.setAttribute('class','col');
        divRowV.appendChild(divFaxV);  
        
        divPrincipal.appendChild(divRowV);


        let divContainerButton = document.createElement("div");
        divContainerButton.setAttribute('class','row mt-auto');
        divPrincipal.appendChild(divContainerButton);

        let divCol = document.createElement("div");
        divCol.setAttribute('class','col');
        divContainerButton.appendChild(divCol);

        let href = document.createElement("a");
        href.setAttribute('class','btn btn-primary');
        href.setAttribute('target','_blank');
        href.style.width='30%';
        divContainerButton.appendChild(href);

        let divCol1 = document.createElement("div");
        divCol1.setAttribute('class','col');
        divContainerButton.appendChild(divCol1);

        h5.innerHTML=parks[i].LocationName;
        p.innerHTML=`${parks[i].Address} ${parks[i].City}, ${parks[i].State} ${parks[i].ZipCode}`;
        divPhoneV.innerHTML=parks[i].Phone===0?'N/A':parks[i].Phone;
        divFaxV.innerHTML=parks[i].Fax===0?'N/A':parks[i].Fax;
        href.innerHTML='Map';
        href.setAttribute('href',`https://www.google.com/maps/place/${parks[i].Latitude},${parks[i].Longitude}`);
    }

    if(parks.length===0){
        let div = document.createElement("div");
        
        divContent.appendChild(div);
        div.innerHTML='Sorry, no matching parks found.'; 
    }
}


//
selectPark.addEventListener("change",function(){
    let j=0;
   
    initDivInfo();
    let divDesc=document.getElementById("idDivDesc");
    
    parkSelected=findParkInArray(selectPark.value, optionActive);

    showParks(parkSelected);

})

//this listener is used in the initial load
selectPark.addEventListener("click",function(){
    console.log('This is a test ');
    if(selectPark.length===1){
        initValues('');
        locationsArray.forEach(option =>
            selectPark.add(
              new Option(option, option)
            )
        );
        optionActive=1;
    }
    
    
})