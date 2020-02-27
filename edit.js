function onEditStudent(index) {
    preventItemBoxEventInvoked (index);
    document.getElementById("popup-section").className = "edit__popup--open";

    document.getElementById("submit2").addEventListener("click", submitForm);
   
    document.getElementById("name2").value = Student.data[index].name;
    document.getElementById("address2").value = Student.data[index].address;
    document.getElementById("phone2").value = Student.data[index].phone;
    document.getElementById("email2").value = Student.data[index].email;
    document.getElementById("age2").value = Student.data[index].age;

    
    let selectedValue = Student.data[index].job;
    
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

    let nameInput = document.getElementById("name2");
    let allItem = document.getElementById("popup__form").querySelectorAll("div");
    let emailInput = document.getElementById("email2");
    let ageInput = document.getElementById("age2");
    let addressInput = document.getElementById("address2");
    let phoneInput = document.getElementById("phone2");

    

    let icon1 = allItem[0].querySelector(".falseIconEmpty2");
    let icon2 = allItem[3].querySelector(".falseIconEmpty2");
    let icon3 = allItem[4].querySelector(".falseIconEmpty2");
    let icon4 = allItem[1].querySelector(".falseIconEmpty2");
    let icon5 = allItem[2].querySelector(".falseIconEmpty2");
 

    document.getElementById("name2").addEventListener("input",checkThisForm);
    document.getElementById("email2").addEventListener("input",checkemailCorrect);

    document.getElementById("age2").addEventListener("input",checkageCorrect);

    document.getElementById("address2").addEventListener("input",checkAdressFieldCorrect);

    document.getElementById("phone2").addEventListener("input",checkPhoneFieldCorrect);



    function checkThisForm(){

        if(validateName(nameInput.value)) {
            document.getElementById("submit2").style.backgroundColor = "red";
            nameInput.style.borderColor = "green";
            icon1.style.visibility = "hidden";
            document.getElementById("submit2").disabled = false;
        }

        else {
            document.getElementById("submit2").disabled = true;
            document.getElementById("submit2").style.backgroundColor = "black";
            nameInput.style.borderColor = "red";
            icon1.style.visibility = "visible";
        }

    }

    function checkemailCorrect() {
        if(validateEmail(emailInput.value)) {
            document.getElementById("submit2").style.backgroundColor = "red";
            emailInput.style.borderColor = "green";
            icon2.style.visibility = "hidden";
            document.getElementById("submit2").disabled = false;
        }

        else {
            document.getElementById("submit2").style.backgroundColor = "black";
            emailInput.style.borderColor = "red";
            icon2.style.visibility = "visible";
            document.getElementById("submit2").disabled = true;
        }
    }

   
    function checkageCorrect() {
        if(validateAge(ageInput.value)) {
            document.getElementById("submit2").style.backgroundColor = "red";
            ageInput.style.borderColor = "green";
            icon3.style.visibility = "hidden";
            document.getElementById("submit2").disabled = false;
        }

        else {
            document.getElementById("submit2").style.backgroundColor = "black";
            ageInput.style.borderColor = "red";
            icon3.style.visibility = "visible";
            document.getElementById("submit2").disabled = true;
        }
    }

    function checkAdressFieldCorrect () {
        if(addressInput.value.length > 5) {
            document.getElementById("submit2").style.backgroundColor = "red";
            addressInput.style.borderColor = "green";
            icon4.style.visibility = "hidden";
            document.getElementById("submit2").disabled = false;
        }

        else {
            document.getElementById("submit2").style.backgroundColor = "black";
            addressInput.style.borderColor = "red";
            icon4.style.visibility = "visible";
            document.getElementById("submit2").disabled = true;
        }
    }

    function checkPhoneFieldCorrect() {
        if(phoneInput.value.length > 5) {
            document.getElementById("submit2").style.backgroundColor = "red";
            phoneInput.style.borderColor = "green";
            icon5.style.visibility = "hidden";
            document.getElementById("submit2").disabled = false;
        }

        else {
            document.getElementById("submit2").style.backgroundColor = "black";
            phoneInput.style.borderColor = "red";
            icon5.style.visibility = "visible";
            document.getElementById("submit2").disabled = true;
        }
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