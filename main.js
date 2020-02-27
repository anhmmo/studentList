'use strict';
const storeKey = "STUDENT_DATA";
const storeColor = "COLOR";
const storeScrollKey = "SCROLL";

window.onload = checkExitsLocalStorage();
let thisSaveScrollNumber = 0; //this variables save number where position of item is.

//check if localStorage not exits, then create new localStorage
function checkExitsLocalStorage() {
    let localStorageLength = localStorage.length; //return 0 if not exits, if exists localStorageLength = 1.
    if(localStorageLength < 2){ // if COLOR not exists.
        setFirstTimeBackgroundColor(); //create new default color: white
    }
    getBackgroundColor(); // COLOR key was created, get current Backgroundcolor
    let studentDataIndex = false;

    if(localStorage.STUDENT_DATA){
            studentDataIndex = true;
    }
    
    if(!studentDataIndex){
        //set an sample data, this data can remove like this: const jsonData = JSON.stringify([]);
        const jsonData = JSON.stringify([{"name":"example","address":"none","phone":"00056844","email":"example@gmail.com","age":"12","job":"none"}]);
        localStorage.setItem("STUDENT_DATA", jsonData);
    }

    if(localStorage.backup) {
        let arr1 = localStorage.getItem("backup");
        let arr2 = JSON.parse(arr1);
        let arr3 = localStorage.getItem("STUDENT_DATA");
        let arr4 = JSON.parse(arr3);
        let restoreIcon = document.getElementById("undo-deleted-item");
    
        if(localStorageLength>=3 && (arr2.length > arr4.length)){
        restoreIcon.style.display = "block";
        } 
    }
    
}
  

//create object to store student info, function
let listItem = document.getElementById("list-item");
const Student = {
    data : [],
    load: function() {
        const jsonData = localStorage.getItem(storeKey);
        try {
                this.data = JSON.parse(jsonData);
        } catch (e) {
            alert("some thing wrong !");
        }
    },
    add: function(student){
        this.data.push(student)
    },
    edit:function(index, student){
        this.data[index] = student;
    },
    delete: function(index){
        this.data.splice(index,1);
    },
    save: function(){
            const jsonData = JSON.stringify(this.data);
            localStorage.setItem(storeKey, jsonData);
    },
    get list(){
        return this.data;
    },

    set changeData(newContent) {
        return this.data = newContent;
    }
}

  Student.load();
  renderStudents();

  let selectDivInMain = document.getElementById("main-form").querySelectorAll("div");

  let selectNotice = selectDivInMain[0].querySelector("p");
  let selectNotice2 = selectDivInMain[1].querySelector("p");
  let selectNotice3 = selectDivInMain[2].querySelector("p");
  let selectNotice4 = selectDivInMain[3].querySelector("p");
  let selectNotice5 = selectDivInMain[4].querySelector("p");
  let selectNotice6 = selectDivInMain[5].querySelector("p");

//when save button click
document.getElementById("submit").addEventListener("click",submitClickHandle);
function submitClickHandle(e) {
    
    e.preventDefault();
    
    let name = getInputValue("#name");
    let address = getInputValue("#address");
    let phone = getInputValue("#phone");
    let email = getInputValue("#email");
    let age = getInputValue("#age");
    let selected = changeSelectedValue(getInputValue("#selectOption"));
    saveScrollNumber(Student.list.length);

   let getAllIcon = selectDivInMain[0].querySelectorAll("i");
   let getAllIcon1 = selectDivInMain[1].querySelectorAll("i");
   let getAllIcon2 = selectDivInMain[2].querySelectorAll("i");
   let getAllIcon3 = selectDivInMain[3].querySelectorAll("i");
   let getAllIcon4 = selectDivInMain[4].querySelectorAll("i");
   let getAllIcon5 = selectDivInMain[5].querySelectorAll("i");

    if(typeof name === "boolean") {
        selectNotice.className = "notice-display-block";
        getAllIcon[0].className = "falseIconEmpty fas fa-times";
        getAllIcon[2].className = "requiredIconEmpty fas fa-star-of-life";
        return;
    }

    if(address.length == 0) {
        selectNotice2.className = "notice-display-block";
        getAllIcon1[0].className = "falseIconEmpty fas fa-times";
        getAllIcon1[2].className = "requiredIconEmpty fas fa-star-of-life";
        return;
    }

    if(phone.length == 0) {
        selectNotice3.className = "notice-display-block";
        getAllIcon2[0].className = "falseIconEmpty fas fa-times";
        getAllIcon2[2].className = "requiredIconEmpty fas fa-star-of-life";
        return;
    }

    if(!email) {
        selectNotice4.className = "notice-display-block";
        getAllIcon3[0].className = "falseIconEmpty fas fa-times";
        getAllIcon3[2].className = "requiredIconEmpty fas fa-star-of-life";
        return false;
    }

    if(!(age > 17 && age.length < 3)) {
        selectNotice5.className = "notice-display-block";
        getAllIcon4[0].className = "falseIconEmpty fas fa-times";
        getAllIcon4[2].className = "requiredIconEmpty fas fa-star-of-life";
        return;
    }

    if(selected == "Not selected") {
        selectNotice6.className = "notice-display-block";
        getAllIcon5[0].className = "falseIconEmpty fas fa-times";
        getAllIcon5[2].className = "requiredIconEmpty fas fa-star-of-life";
        return;
    }
    
    Student.add({
        name: name,
        address: address,
        phone: phone,
        email: email,
        age: age,
        job: selected
        });

    Student.save();
    window.location.reload();
}


// exit button clicked
document.getElementById("exit-form").addEventListener("click", function() {
    document.getElementById("right-containers").style.display = "none";
    document.getElementById("add-form-open").className = "open-add-form";
});
//render student item to html items list

function renderStudents() {
    const Students = Student.list;
    for(let i = 0; i < Students.length; i++) {

        let opiskelija = Students[i];
        let itembox = document.createElement("div");
        itembox.className = "item__box";
        itembox.id = "scroll"+i;
        itembox.onclick = function() { selectItemBox(i); };
        let divItem = document.createElement("div");
        let divIcon = document.createElement("div");
        let divItemNumber = document.createElement("div");
        let letItemIcon = document.createElement("i");
        let letItemIcon2 = document.createElement("i");
        let divCopiedStudent = document.createElement("div");

        divItem.className = "item__box--info";
        divIcon.className = "item__box--icon";

        let studentCopyInfo = `${opiskelija.name}, ${opiskelija.address}, ${opiskelija.phone}, ${opiskelija.email}, ${opiskelija.age}, ${opiskelija.job}`;

        divItem.innerHTML = `<p>Name: ${opiskelija.name} </p><p>Address : ${opiskelija.address} </p><p>Phone : ${opiskelija.phone} </p><p>Email: ${opiskelija.email} </p><p>Age: ${opiskelija.age} </p><p>Job : ${opiskelija.job}</p>`;
        divCopiedStudent.innerHTML = `<input class="myInput" type="text" value="${studentCopyInfo}" id="myInput${i}"><div id="copiedStudent${i}" class="copyStudent">Copy Student Info</div>`;
        divIcon.innerHTML = `<i id="delete${i}" class="deleteInfo fas fa-trash-alt" onclick="onDeleteStudent(${i})"></i><i id="edit${i}" class="editInfo fas fa-edit" onclick="onEditStudent(${i})"></i><i id="copy${i}" class="copyIcon fab fa-creative-commons-share" onclick="onCopyStudentInfo(${i})"></i><i id="info${i}" class="infoIcon fas fa-info-circle" onclick="onGetInfoStudent(${i})"></i>`;
        
        letItemIcon.className = "iconcircle fas fa-circle";
        letItemIcon2.className = "iconcircle2 fas fa-circle";
        divItemNumber.className = "itemNumberBox";

        divItemNumber.innerHTML = i+1;

        itembox.appendChild(divItem);
        itembox.appendChild(divCopiedStudent);
        itembox.appendChild(divIcon);
        itembox.appendChild(letItemIcon);
        itembox.appendChild(letItemIcon2);
        itembox.appendChild(divItemNumber);

        listItem.appendChild(itembox);
    }
}








//other need function

function changeSelectedValue(getValue) {
    switch(getValue){
        case "1":
        return "Student";
        break;

        case "2":
        return "Software Developer";
        break;

        case "3":
        return "Web -fullstack developer";
        break;

        case "4":
        return "Sofware engineer";
        break;

        default:
        return "Not selected";
        break;
    }
}

function getInputValue(selector){
    let inputValue = document.querySelector(selector);
    if(selector == "#email") {
        let results = validateEmail(inputValue.value);
        if(results){
            return inputValue.value;
        }
        return false;
    }
    else if(selector == "#name") {
        let validName = validateName(inputValue.value);
        if(validName) {
            return inputValue.value;
        }
        return false;
    }
    return inputValue.value;
}




let validateEmail = email => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? true : false;

let validateName = name => (/^[a-zA-Z ]{2,30}$/.test(name)) ? true: false;

let validateAge = age => age > 17 && age.length < 3 ? true: false;
// color menu box
function getBackgroundColor () {
    let currentBackgroundColor = localStorage.getItem(storeColor);
    let colorParse = JSON.parse(currentBackgroundColor);
    document.body.style.backgroundColor = colorParse;
    return colorParse;
}
//change background color function 
function setFirstTimeBackgroundColor () {
    const colorNumber = JSON.stringify("white");
    localStorage.setItem(storeColor, colorNumber);
    let colorParse = JSON.parse(colorNumber);
    document.body.style.backgroundColor = colorParse;
    return colorParse;
}




//delete all person icon
let nerS;
let deleteArray = [];
let filtedArrayCopy = [];
let selectedAllPersons = document.getElementById("delete-person-box");
let selectedAllStudents = document.getElementById("delete-all-person");
selectedAllStudents.addEventListener("click", function() {
    deteteSelectedStudents(filtedArrayCopy);
});
let getContainer = document.getElementById("list-item").querySelectorAll("div .item__box");
let itemNumberBox = document.getElementById("list-item").querySelectorAll(".itemNumberBox");

function selectItemBox (index) {

        let restoreIcon = document.getElementById("undo-deleted-item");
        restoreIcon.style.display = "none";
        deleteArray.indexOf(index) === -1 ? deleteArray[index] = index : deleteArray[index] = undefined;
    
        let counterDelete = document.getElementById("delete-counter");
       
        let filtedArray = deleteArray.filter(valueA => typeof valueA === "number");
        
        counterDelete.innerText = filtedArray.length;
        filtedArrayCopy = filtedArray;
    
        filtedArray.length < 1 ? selectedAllPersons.style.display = "none" : selectedAllPersons.style.display = "block";
       // console.log(filtedArray);

        deleteArray.indexOf(index) === -1 ? getContainer[index].className = "item__box" : getContainer[index].className = "item__box2";
       
        if(getContainer[index].getAttribute("class") === "item__box2" && screen.width <=1250 || screen.width <= 520){
            itemNumberBox[index].style.backgroundColor = "white";
            itemNumberBox[index].style.color = "tomato";
        }
        else {
            itemNumberBox[index].style.backgroundColor = "rgb(252, 171, 65)";
            itemNumberBox[index].style.color = "white";    
        }

      //  console.log(getContainer[index]);
}

function deteteSelectedStudents (filtedArrayCopy) {

    nerS = Student.list;
    const jsonData = JSON.stringify(nerS);
    localStorage.setItem("backup", jsonData);
    
        let studentListArr = Student.list;

    for (let i = filtedArrayCopy.length - 1; i >= 0; i--) {
        if(typeof filtedArrayCopy[i] !== "undefined"){
            studentListArr.splice(filtedArrayCopy[i], 1); 
        }      
    }  
    
    Student.save();
    window.location.reload();
}

//this function prevent item__box event working when an icon event clicked

function preventItemBoxEventInvoked (index) {
    let getContainer = document.getElementById("list-item").querySelectorAll("div .item__box");
    
    getContainer[index].onclick = ""; 
}

function unlockItemBoxEventInvoked (index) {
    let getContainer = document.getElementById("list-item").querySelectorAll("div .item__box");
    
    getContainer[index].onclick = "selectItemBox" + index; 
}



let restoreD = document.getElementById("restore-deleted");
restoreD.addEventListener("click", restoreAllDeleteditems);

function restoreAllDeleteditems() {
    const jsonData = localStorage.getItem("backup");
        try {
            Student.changeData = JSON.parse(jsonData);
            Student.save();
            Student.load();
        } catch (e) {
            alert("some thing wrong !");
    }
    window.location.reload();
}


// add button when clicked
document.getElementById("add-form-open").addEventListener("click", openAddForm);

function openAddForm () {
    document.getElementById("right-containers").style.display = "block";
    document.getElementById("add-form-open").className = "add-form-open";
}

