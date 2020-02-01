'use strict';

window.onload = checkExitsLocalStorage();

//check if localStorage not exits, then create new localStorage
function checkExitsLocalStorage() {
    var ifExits = localStorage.length; //return 0 if not exits
    if(ifExits < 1){
        const jsonData = JSON.stringify([{"name":"example","address":"none","phone":"00056844","email":"example@gmail.com","age":"12","job":"none"}]);
        localStorage.setItem("STUDENT_DATA", jsonData);
    }
}
//create object to store student info, function
var storeKey = "STUDENT_DATA";
let listItem = document.getElementById("list-item");
const Student = {
    
    data : [],

    
    load: function() {
        const jsonData = localStorage.getItem(storeKey);
        try {
                this.data = JSON.parse(jsonData);
        } catch (e) {
            alert("chua co thong tin");
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


  //[{"name":"","address":"","phone":"","email":"","age":"","job":""}]


//when submit button click
document.getElementById("submit").addEventListener("click",submitClickHandle);
function submitClickHandle() {
    
    var name = getInputValue("#name");
    var address = getInputValue("#address");
    var phone = getInputValue("#phone");
    var email = getInputValue("#email");
    var age = getInputValue("#age");
    var selected = changeSelectedValue(getInputValue("#selectOption"));
    
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

    for(let i = 0; i < Students.length; i++){

        //console.log(Students.length);
        var opiskelija = Students[i];
        var itembox = document.createElement("div");
        itembox.setAttribute("class", "item__box");
        let divItem = document.createElement("div");
        let divIcon = document.createElement("div");
        let divCopiedStudent = document.createElement("div");

        divItem.setAttribute("class", "item__box--info");
        divIcon.setAttribute("class", "item__box--icon");

        let studentCopyInfo = opiskelija.name + ", " + opiskelija.address + ", " + opiskelija.phone + ", " + opiskelija.email + ", " + opiskelija.age + ", " + opiskelija.job;

        divItem.innerHTML = '<p>Name: '+ opiskelija.name +'</p><p>Address : '+ opiskelija.address +'</p><p>Phone : '+ opiskelija.phone +'</p><p>Email: '+ opiskelija.email +'</p><p>Age: '+ opiskelija.age +'</p><p>Job : '+ opiskelija.job +'</p>';
        divCopiedStudent.innerHTML = '<input class="myInput" type="text" value="'+studentCopyInfo+'" id="myInput'+ i +'"><div id="copiedStudent'+ i +'" class="copyStudent">Copy Student</div>';
        divIcon.innerHTML = '<i id="delete" class="fas fa-trash-alt" onclick="onDeleteStudent(' + i + ')"></i><i id="edit" class="fas fa-edit" onclick="onEditStudent(' + i + ')"></i><i id="copy" class="fab fa-creative-commons-share" onclick="onCopyStudentInfo(' + i + ')"></i><i id="info" class="fas fa-info-circle" onclick="onGetInfoStudent(' + i + ')"></i>';
        

        itembox.appendChild(divItem);
        itembox.appendChild(divCopiedStudent);
        itembox.appendChild(divIcon);
       // console.log(opiskelija.job);
        listItem.appendChild(itembox);
        
    }

    
}

/*
<div class="item__box">
    <div class="item__box--info">
        <p>Name: </p>
        <p>Address : </p>
        <p>Phone : </p>
        <p>Email: </p>
        <p>Age: </p>
        <p>Job : Student</p>
    </div>
    <div class="copiedStudent">Copy Student</div>
    <div class="item__box--icon">
        <i id="delete" class="fas fa-trash-alt" onclick="onDeleteStudent(i)" aria-hidden="true"></i>
        <i id="edit" class="fas fa-edit" onclick="onEditStudent(i)" aria-hidden="true"></i>
        <i id="copy" class="fab fa-creative-commons-share" onclick="onCopyStudentInfo(i)" aria-hidden="true"></i>
        <i id="info" class="fas fa-info-circle" onclick="onGetInfoStudent(i)" aria-hidden="true"></i>
    </div>
</div>
*/


//delete item
function onDeleteStudent(index) {

    let CheckAnswer = confirm("Delete this student ?");
    if(CheckAnswer){
        Student.delete(index);
        Student.save();
        window.location.reload();
    }
}

            
        
//edit item
function onEditStudent(index) {
        document.getElementById("popup-section").removeAttribute("class");
        document.getElementById("popup-section").setAttribute("class", "edit__popup--open");
        document.getElementById("submit2").addEventListener("click", submitForm);
       
        document.getElementById("name2").value = Student.data[index].name;
        document.getElementById("address2").value = Student.data[index].address;
        document.getElementById("phone2").value = Student.data[index].phone;
        document.getElementById("email2").value = Student.data[index].email;
        document.getElementById("age2").value = Student.data[index].age;

        var selectedValue = Student.data[index].job;
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
        
        }

        document.getElementById("submit").removeEventListener("click",submitClickHandle);
        document.getElementById("submit").addEventListener("click", function(event){
        event.preventDefault()
});
        

        
        
        function submitForm(){
            

            var name2 = getInputValue("#name2");
            var address2 = getInputValue("#address2");
            var phone2 = getInputValue("#phone2");
            var email2 = getInputValue("#email2");
            var age2 = getInputValue("#age2");
            var selected2 = changeSelectedValue(getInputValue("#selectOption2"));
        
            var convertStudentToString = '{"name":"'+name2+'","address":"'+address2+'","phone":"'+phone2+'","email":"'+email2+'","age":"'+age2+'","job":"'+selected2+'"}';
            var editedStudent = JSON.parse(convertStudentToString); //convert String to JSON
            Student.edit(index, editedStudent);  
            Student.save();
            window.location.reload();
        }      
}



// copy student info


function onCopyStudentInfo(info){
    

    var copyText = document.getElementById("myInput" + info);
    copyText.removeAttribute("class");
    copyText.setAttribute("class", "myInput2");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    /* Copy the text inside the text field */

    let studentInfo = document.getElementById("copiedStudent" + info);
    console.log(studentInfo);
    studentInfo.removeAttribute("class");
    studentInfo.setAttribute("class", "copiedStudent");
    setTimeout(function(){
        studentInfo.removeAttribute("class");
        studentInfo.setAttribute("class", "copyStudent");
        copyText.removeAttribute("class");
        copyText.setAttribute("class", "myInput");
    }, 600);
}



//popup click

document.getElementById("popup-close").addEventListener("click", closeBtn);

function closeBtn(){
    document.getElementById("popup-section").removeAttribute("class");
    document.getElementById("popup-section").setAttribute("class", "edit__popup");
    window.location.reload();
}




//info--popup--student


let timeOutF;

function onGetInfoStudent(info){
    let popup = document.getElementById("student__popup");
    popup.removeAttribute("class");
    popup.setAttribute("class", "student__popup");
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
   
    info.removeAttribute("class");
    info.setAttribute("class", "student__infomation--show");
    credit.setAttribute("class", "student__infomation--default");
    portfolio.removeAttribute("class");
    portfolio.setAttribute("class", "student__infomation--show");
    studentTextFirst.style.display = "none";
    studentTextThird.style.display = "none";
    studentTextSecond.style.display = "block";
    studentTextSecond.setAttribute("class", "student__text--default");
}

function clickChangeInfoStatus() {

    credit.removeAttribute("class");
    credit.setAttribute("class", "student__infomation--show");
    info.setAttribute("class", "student__infomation--default");
    portfolio.removeAttribute("class");
    portfolio.setAttribute("class", "student__infomation--show");
    studentTextFirst.style.display = "block";
    studentTextThird.style.display = "none";
    studentTextSecond.style.display = "none";
    studentTextFirst.setAttribute("class", "student__text--default");
}

function clickChangePortfolioStatus() {

    credit.removeAttribute("class");
    info.removeAttribute("class");
    credit.setAttribute("class", "student__infomation--show");
    info.setAttribute("class", "student__infomation--show");
    portfolio.setAttribute("class", "student__infomation--default");
    
    studentTextFirst.style.display = "none";
    studentTextThird.style.display = "block";
    studentTextSecond.style.display = "none";
    studentTextThird.setAttribute("class", "student__text--default");
}


//******************************************DANG LAM TOI DAY********************************************
//*******************************************************************************************************

// student info gallery


let studentGallery = document.getElementById("small-gallery");
let iconShow = document.getElementById("iconShow");
let iconHide = document.querySelector("#iconHide");

iconHide.addEventListener("click", hideThisImageBox);
function hideThisImageBox() {
    studentGallery.style.display = "none";
    iconShow.removeAttribute("class");
    iconShow.setAttribute("class","showImageIcon fas fa-image");
    iconHide.removeAttribute("class");
    
}

iconShow.addEventListener("click", showThisImageBox);

function showThisImageBox() {
    studentGallery.style.display = "flex";
    iconHide.setAttribute("class","hideImageIcon fas fa-window-close");
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
    createCloseButtonMain.removeAttribute("class");
    createCloseButtonMain.setAttribute("class","popup-close-2 fas fa-times-circle");
    clearTimeout(timeOutF);
}

createCloseButtonMain.addEventListener("click", closeSecondButton);

function closeSecondButton () {
    document.getElementById("student__popup").removeAttribute("class");
    document.getElementById("student__popup").setAttribute("class", "student__popup--hide");
    
}


function openImage(luku) {
    
    studentCloseSlider.style.display = "block";
    let style1 = document.getElementById("openThis");
    style1.removeAttribute("class");
    style1.setAttribute("class", "student__gallery student" + luku);
    createCloseButton.setAttribute("class","popup-close fas fa-times-circle");
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






//slidershow clode button control









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
    var inputValue = document.querySelector(selector);
    return inputValue.value;
}





