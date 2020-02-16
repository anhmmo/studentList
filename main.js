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
    for(let i = 0; i < localStorage.length; i++){
      if(typeof JSON.parse(localStorage.getItem(localStorage.key(i))) === "object"){ //check if STUDENT_DATA EXISTS
        studentDataIndex = true; 
      }
    }
    if(!studentDataIndex){
        //set an sample data, this data can remove like this: const jsonData = JSON.stringify([]);
        const jsonData = JSON.stringify([{"name":"example","address":"none","phone":"00056844","email":"example@gmail.com","age":"12","job":"none"}]);
        localStorage.setItem("STUDENT_DATA", jsonData);
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

    if(!name) {
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

    if(age.length == 0) {
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

//render student item to html items list

function renderStudents() {
    const Students = Student.list;
    for(let i = 0; i < Students.length; i++) {

        let opiskelija = Students[i];
        let itembox = document.createElement("div");
        itembox.className = "item__box";
        itembox.onclick = function() { selectItemBox(i); };
        let divItem = document.createElement("div");
        let divIcon = document.createElement("div");
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

        itembox.appendChild(divItem);
        itembox.appendChild(divCopiedStudent);
        itembox.appendChild(divIcon);
        itembox.appendChild(letItemIcon);
        itembox.appendChild(letItemIcon2);

        listItem.appendChild(itembox);
    }
}
/*
<div class="item__box">
    <div class="item__box--info">
        <p>Name: Anhmmo</p>
        <p>Address : kirstin 2 h 6</p>
        <p>Phone : 0025254252</p>
        <p>Email: anhmmo@gmail.com</p>
        <p>Age: 99</p>
        <p>Job : Software Developer</p>
    </div>
    <div>
        <input class="myInput" type="text" value="Anhmmo, kirstin 2 h 6, 0025254252, anhmmo@gmail.com, 99, Software Developer" id="myInput0">
        <div id="copiedStudent0" class="copyStudent">Copy Student</div>
    </div>
    <div class="item__box--icon">
        <i id="delete0" class="deleteInfo fas fa-trash-alt" onclick="onDeleteStudent(0)" aria-hidden="true"></i>
        <i id="edit0" class="editInfo fas fa-edit" onclick="onEditStudent(0)" aria-hidden="true"></i>
        <i id="copy0" class="copyIcon fab fa-creative-commons-share" onclick="onCopyStudentInfo(0)" aria-hidden="true"></i>
        <i id="info0" class="infoIcon fas fa-info-circle" onclick="onGetInfoStudent(0)" aria-hidden="true"></i>
    </div>
    <i class="iconcircle fas fa-circle" aria-hidden="true"></i>
    <i class="iconcircle2 fas fa-circle" aria-hidden="true"></i>
</div>
*/

//delete item
function onDeleteStudent(index) {
    saveScrollNumber(index);
    let CheckAnswer = confirm("Delete this student ?");
    if(CheckAnswer){
        Student.delete(index);
        Student.save();
        window.location.reload();
    }
}
    
//edit item
function onEditStudent(index) {

        document.getElementById("popup-section").className = "edit__popup--open";
        document.getElementById("submit2").addEventListener("click", submitForm);
       
        document.getElementById("name2").value = Student.data[index].name;
        document.getElementById("address2").value = Student.data[index].address;
        document.getElementById("phone2").value = Student.data[index].phone;
        document.getElementById("email2").value = Student.data[index].email;
        document.getElementById("age2").value = Student.data[index].age;

        let selectedValue = Student.data[index].job;
        console.log(selectedValue);
        switch(selectedValue){
            case "Student":
            document.getElementById("selectOption2").value = "1";
            break;
            case "Software Developer":
            document.getElementById("selectOption2").value = "2";
            break;
            case "Web -fullstack developer":
            document.getElementById("selectOption2").value = "3";
            break;
            case "Sofware engineer":
            document.getElementById("selectOption2").value = "4";
            break;
            default:
            document.getElementById("selectOption2").value = "";
            break;
        }

        saveScrollNumber(index);
        preventOtherFunctionByDefault ();
        
        function submitForm() {
            let name = getInputValue("#name2");
            let address = getInputValue("#address2");
            let phone = getInputValue("#phone2");
            let email = getInputValue("#email2");
            let age = getInputValue("#age2");
            let selected = changeSelectedValue(getInputValue("#selectOption2"));
        
            let convertStudentToString = `{"name":"${name}","address":"${address}","phone":"${phone}","email":"${email}","age":"${age}","job":"${selected}"}`;
            let editedStudent = JSON.parse(convertStudentToString); //convert String to JSON
            Student.edit(index, editedStudent);  
            Student.save();
            window.location.reload();
        }      
}

// copy student info

function onCopyStudentInfo(info){
    let copyText = document.getElementById("myInput" + info);
    copyText.className = "myInput2";
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    /* Copy the text inside the text field */
    let studentInfo = document.getElementById("copiedStudent" + info);
    studentInfo.className = "copiedStudent";
    setTimeout(function(){
        studentInfo.className = "copyStudent";
        copyText.className = "myInput";
    }, 600);
}

//popup close click
document.getElementById("popup-close").addEventListener("click", closeBtn);
function closeBtn(){
    document.getElementById("popup-section").className = "edit__popup";
    window.location.reload();
}

//info--popup--student

let timeOutF;
function onGetInfoStudent(index){
    let popup = document.getElementById("student__popup");
    let createH2 = document.createElement("h2");
    if(Student.list[index].name=="")
    {
        Student.list[index].name = "student name";
    }
    createH2.innerHTML = Student.list[index].name;
    popup.insertBefore(createH2, popup.childNodes[0]);
    
    popup.className = "student__popup";
    saveScrollNumber(index);
    preventOtherFunctionByDefault ();
}

let credit = document.getElementById("student__infomation--credit");
let info = document.getElementById("student__infomation--info");
let portfolio = document.getElementById("student__infomation--portfolio");

credit.addEventListener("click", clickChangeCreditStatus);
info.addEventListener("click", clickChangeInfoStatus);
portfolio.addEventListener("click", clickChangePortfolioStatus);

let studentTextFirst = document.getElementById("student__text-1");
let studentTextSecond = document.getElementById("student__text-2");
let studentTextThird = document.getElementById("student__text-3");

function clickChangeCreditStatus() {
   
    info.className = "student__infomation--show";
    credit.className = "student__infomation--default";
    portfolio.className = "student__infomation--show";
    studentTextFirst.style.display = "none";
    studentTextThird.style.display = "none";
    studentTextSecond.style.display = "block";
    studentTextSecond.className = "student__text--default";
}

function clickChangeInfoStatus() {
    credit.className = "student__infomation--show";
    info.className = "student__infomation--default";
    portfolio.className = "student__infomation--show";
    studentTextFirst.style.display = "block";
    studentTextThird.style.display = "none";
    studentTextSecond.style.display = "none";
    studentTextFirst.className = "student__text--default";
}

function clickChangePortfolioStatus() {
    credit.className = "student__infomation--show";
    info.className = "student__infomation--show";
    portfolio.className = "student__infomation--default";
    
    studentTextFirst.style.display = "none";
    studentTextThird.style.display = "block";
    studentTextSecond.style.display = "none";
    studentTextThird.className = "student__text--default";
}

// student info gallery
let studentGallery = document.getElementById("small-gallery");
let iconShow = document.getElementById("iconShow");
let iconHide = document.querySelector("#iconHide");

iconHide.addEventListener("click", hideThisImageBox);
function hideThisImageBox() {
    studentGallery.style.display = "none";
    iconShow.className = "showImageIcon fas fa-image";
    iconHide.removeAttribute("class");
}

iconShow.addEventListener("click", showThisImageBox);

function showThisImageBox() {
    studentGallery.style.display = "flex";
    iconHide.className = "hideImageIcon fas fa-window-close";
    iconShow.removeAttribute("class");
    clearTimeout(timeOutF);
}

let studentCloseSlider = document.getElementById("student__gallery");
studentCloseSlider.style.display = "none";
let createCloseButton = document.getElementById("gallery-close");
let createCloseButtonMain = document.getElementById("gallery-close-main");
createCloseButton.addEventListener("click", closeThisSlider);
function closeThisSlider () {
    studentCloseSlider.style.display = "none";
    createCloseButton.removeAttribute("class");
    createCloseButtonMain.className = "popup-close-2 fas fa-times-circle";
    clearTimeout(timeOutF);
}

createCloseButtonMain.addEventListener("click", closeSecondButton);

function closeSecondButton () {
    document.getElementById("student__popup").className = "student__popup--hide";
    window.location.reload();
}

//slidershow open image automatically

function openImage(luku) {
    
    studentCloseSlider.style.display = "block";
    let style1 = document.getElementById("openThis");
    style1.className = "student__gallery student" + luku;
    createCloseButton.className = "popup-close fas fa-times-circle";
    createCloseButtonMain.removeAttribute("class");
    
    if(luku>7){
        luku = 0;
    }
    timeOutF = setTimeout(
        function()
        { 
            hideThisImageBox();
            openImage(++luku);
        }, 3000);
}

//this function prevent other event working when an popup open

function preventOtherFunctionByDefault () {
    
    for (let index = 0; index < Student.list.length; index++) {
        document.getElementById("delete"+index).onclick = "";
        document.getElementById("edit"+index).onclick = "";
        document.getElementById("copy"+index).onclick = "";
        document.getElementById("info"+index).onclick = "";
    }
    document.getElementById("submit").removeEventListener("click",submitClickHandle);
    document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault()
    });
}

// scroll to position where it is current view
function scrollToMyView(elementti) {
    let elmnt = document.getElementById(elementti);
    if(elmnt !== null)
    {
        elmnt.scrollIntoView();
    }
  }

  //form validation
  //first hide all icon
  let selectInputElement;
  let selectMainForm = document.getElementById("main-form").querySelectorAll("div");
  for (let index = 0; index < selectMainForm.length; index++) {
    let selectIElement = selectMainForm[index].querySelectorAll("i");
    selectIElement[0].className = "hideFormIcon";
    selectIElement[1].className = "hideFormIcon";
  }
  
 selectInputElement = selectMainForm[0].querySelector("input");
 let selectInputElement1 = selectMainForm[1].querySelector("input");
 let selectInputElement2 = selectMainForm[2].querySelector("input");
 let selectInputElement3 = selectMainForm[3].querySelector("input");
 let selectInputElement4 = selectMainForm[4].querySelector("input");
 let selectInputElement5 = selectMainForm[5].querySelector("select");

 // let addressField = document.getElementById("address");
    selectInputElement.onclick = checkFormEvent(0, "#name");  
    selectInputElement1.onclick = checkFormEvent(1, "#address");  
    selectInputElement2.onclick = checkFormEvent(2, "#phone");  
    selectInputElement3.onclick = checkFormEvent(3, "#email"); 
    selectInputElement4.onclick = checkFormEvent(4, "#age");  
    selectInputElement5.onclick = checkFormEvent(5, "#selectOption");  

  //icon control

  function checkFormEvent(index, name) {

    let selectMainForm2 = document.getElementById("main-form").querySelectorAll("div");
    let selectIElement2 = selectMainForm2[index].querySelectorAll("i");
    let selectInputElement2 = selectMainForm2[index].querySelector(name);
   
    let falseIcon = selectIElement2[0];
    let trueIcon = selectIElement2[1];
    let requiredIcon = selectIElement2[2];
    
    selectInputElement2.addEventListener("focus", checkTyping);
    selectInputElement2.addEventListener("input", checkInputForm);
    selectInputElement2.addEventListener("blur", checkIfNotType);

  function checkIfNotType () {
      selectInputElement2.placeholder = this.name + " is required";
      if(this.name=="Email" || this.name =="Name"){
        if(selectInputElement2.value.length > 0 && validateEmail(selectInputElement2.value) || selectInputElement2.value.length > 0 && validateName(selectInputElement2.value)) {
            requiredIcon.style.color = "white";
            selectInputElement2.style.borderColor = "green";
            
          }
          else {
            requiredIcon.style.color = "red";
            selectInputElement2.style.borderColor = "red";
          }
      }
      else {
        if(selectInputElement2.value.length==0) {
            requiredIcon.style.color = "red";
            selectInputElement2.style.borderColor = "red";
          }
          else {
            requiredIcon.style.color = "white";
            selectInputElement2.style.borderColor = "green";
          }
      }
  }

  function checkInputForm () {
    if(this.name=="Email" || this.name == "Name"){
        
        if (selectInputElement2.value.length>0 && validateEmail(selectInputElement2.value) || selectInputElement2.value.length>0 && validateName(selectInputElement2.value)) {
            
            selectNotice4.className = "notice-display-none";
            trueIcon.className = "trueIcon fas fa-check";
            falseIcon.className = "hideFormIcon";
            requiredIcon.style.color = "white";
            selectInputElement2.style.borderColor = "green";
        }
        else {
            
            trueIcon.className = "hideFormIcon";
            requiredIcon.style.color = "red";
            selectInputElement2.style.borderColor = "red";
        }
    
    }

    else {
    
         if (selectInputElement2.value.length>0) {
            selectInputElement2.style.borderColor = "green";
            selectNotice.className = "notice-display-none";
            selectNotice2.className = "notice-display-none";
            selectNotice3.className = "notice-display-none";
            selectNotice5.className = "notice-display-none";
            selectNotice6.className = "notice-display-none";
            trueIcon.className = "trueIcon fas fa-check";
            falseIcon.className = "hideFormIcon";
            requiredIcon.style.color = "white";
        }
        else {
            selectInputElement2.style.borderColor = "red";
          
            trueIcon.className = "hideFormIcon";
            requiredIcon.style.color = "red";
        }
    
    }
  }

    function checkTyping() {
        selectInputElement2.placeholder ="";
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

//save scroll number to localStorage
function saveScrollNumber (luku) {
    thisSaveScrollNumber = luku;
    const scrollNumber = JSON.stringify(thisSaveScrollNumber);
    localStorage.setItem(storeScrollKey, scrollNumber);
}

//get position number of item then call scrollToView function

let getScroll = parseInt(localStorage.getItem(storeScrollKey)); 
// or +(localStorage.getItem("SCROLL")) to convert string to int

--getScroll;

getScroll==-1 ? getScroll = 0 : getScroll;
scrollToMyView("copy" + getScroll) ? (scrollToMyView("copy" + 0)) : (scrollToMyView("delete" + getScroll)) ; 


let validateEmail = email => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? true : false;

let validateName = (name) => (/^[a-zA-Z ]{2,30}$/.test(name)) ? true: false;


// color menu box

let colorMenuBox = document.getElementById("colorMenu");
let colorMenuSetting = document.getElementById("colorSetting");

colorMenuSetting.addEventListener("click", openColorMenuBox);

function openColorMenuBox() {
    let isThisClassUsed = colorMenuBox.getAttribute("class");
   
    if(isThisClassUsed == "hideMenu" || isThisClassUsed == "colorMenuHide"){
        colorMenuBox.className = "colorMenuShow";
    }
    else {
        colorMenuBox.className = "colorMenuHide";
    } 
}

//change background color function 
function setFirstTimeBackgroundColor () {
    const colorNumber = JSON.stringify("white");
    localStorage.setItem(storeColor, colorNumber);
    let colorParse = JSON.parse(colorNumber);
    document.body.style.backgroundColor = colorParse;
    return colorParse;
}

function getBackgroundColor () {
    let currentBackgroundColor = localStorage.getItem(storeColor);
    let colorParse = JSON.parse(currentBackgroundColor);
    document.body.style.backgroundColor = colorParse;
    return colorParse;
}

let redColor = document.getElementById("changeColorRed");
//it look same redColor.addEventListener("click", function(){ changeColor("#F44336"); });
redColor.addEventListener("click", () => changeColor("#F44336"));
let greenColor = document.getElementById("changeColorGreen");
greenColor.addEventListener("click", () => changeColor("#4CAF50"));
let blueColor = document.getElementById("changeColorBlue");
blueColor.addEventListener("click", () => changeColor("#2196F3"));
let whiteColor = document.getElementById("changeColorWhite");
whiteColor.addEventListener("click", () => changeColor("#ffffff"));
let violetColor = document.getElementById("changeColorViolet");
violetColor.addEventListener("click", () => changeColor("#9C27B0"));



function changeColor(color) {
    const newColor = JSON.stringify(color);
    localStorage.setItem(storeColor, newColor);
    window.location.reload();
}

//scroll to top icon view
let iconToTheTop = document.getElementById("toTheTop");
iconToTheTop.style.display = "none";
//call onscroll event when user scroll down more than 500px, icon show if scroll less than 500x icon display none.
listItem.onscroll = () => listItem.scrollTop > 500 ? iconToTheTop.style.display = "block" : iconToTheTop.style.display = "none";
saveScrollNumber(1);


//delete all person icon
let deleteArray = [];


let upMore = 2;
let cong = 2;
function selectItemBox (index) {
    
        let divvv = document.getElementById("list-item").querySelectorAll("div .item__box");
        let boxItem = divvv[index];
        
        deleteArray.indexOf(index) === -1 ? deleteArray[index] = index : deleteArray.splice(deleteArray.indexOf(index), 1);

        if(upMore%2 > 0){
            boxItem.style.color = "white";
            upMore=2;
        }
        else {
            boxItem.style.color = "black";
            upMore=3;
        }
        console.log(deleteArray);
        if(deleteArray.length>0) {
            selectedAllPersons.style.display = "block";
        }
        console.log(deleteArray.length);
}

let selectedAllPersons = document.getElementById("delete-person-box");
let selectedAllStudents = document.getElementById("delete-all-person");
selectedAllStudents.addEventListener("click", function() {
    deteteSelectedStudents(deleteArray);
   
});

function deteteSelectedStudents (deleteArray) {
        let rrrra = Student.list;
        deleteArray.sort();
    for (let i = deleteArray.length -1; i >= 0; i--) {
        if(typeof deleteArray[i] !== "undefined"){
            rrrra.splice(deleteArray[i], 1); 
        }
                
    }   
            
            Student.save();
            window.location.reload();
          
}

