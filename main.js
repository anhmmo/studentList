'use strict';
    
    const KEY_NAME = "STUDENTS";

    const Student = {
        ListStudent : [],

        add: function(student){
            this.ListStudent.push(student)
        },

        save: function(){
            const jsonData = JSON.stringify(this.ListStudent);
            localStorage.setItem(KEY_NAME, jsonData);
        }

    };

    const formAuto = document.getElementById('main-form');
        formAuto.addEventListener('submit', function(e) {
            e.preventDefault();
        });

    let buttonClicked = document.getElementById("submit");
    buttonClicked.addEventListener("click", function(){

        let name = getInputValue("name");
        let address = getInputValue("address");
        let phone = getInputValue("phone");
        let email = getInputValue("email");
        let age = getInputValue("age");
        let selected = changeSelectedValue(getInputValue("selectOption"));
      
        Student.add(
            {
                name: name,
                address: address,
                phone: phone,
                email: email,
                age: age,
                job: selected
            }
        );

        Student.save();
        renderToHtml();
    });


    
    let outputJson = localStorage.getItem(KEY_NAME);
    let dataOutput = JSON.parse(outputJson);
    let itembox = document.getElementById("item__box");
    console.log(dataOutput.length);

    function renderToHtml(){
        
        for(let i = 0; i < dataOutput.length; i++){
            
            let divInfo = document.createElement("div");
            divInfo.setAttribute("class", "item__box--info");
            let divIcon = document.createElement("div");
            divIcon.setAttribute("class", "item__box--icon");

            let pName = document.createElement("p");
            let pPhone = document.createElement("p");
            let pAddress = document.createElement("p");
            let pJob = document.createElement("p");
            let pEmail = document.createElement("p");
            let pAge = document.createElement("p");

            let nameText = document.createTextNode("Name: Nguyen");
            pName.appendChild(nameText);
            let phoneText = document.createTextNode("Name: Nguyen");
            pPhone.appendChild(phoneText);
            let addressText = document.createTextNode("Name: Nguyen");
            pAddress.appendChild(addressText);
            let emailText = document.createTextNode("Name: Nguyen");
            pEmail.appendChild(emailText);
            let ageText = document.createTextNode("Name: Nguyen");
            pAge.appendChild(ageText);
            let jobText = document.createTextNode("Name: Nguyen");
            pJob.appendChild(jobText);


            divInfo.appendChild(pName);
            divInfo.appendChild(pPhone);
            divInfo.appendChild(pAddress);
            divInfo.appendChild(pAge);
            divInfo.appendChild(pJob);
            divInfo.appendChild(pEmail);

            let deleteIcon = document.createElement("i");
            let editIcon = document.createElement("i");

            let iconText1 = document.createTextNode('<i id="delete" class="fas fa-trash-alt"></i>');
            let iconText2 = document.createTextNode('<i id="edit" class="fas fa-edit"></i>');

            deleteIcon.appendChild(iconText1);
            editIcon.appendChild(iconText2);

            divIcon.appendChild(deleteIcon);
            divIcon.appendChild(editIcon);

            itembox.appendChild(divIcon);
            itembox.appendChild(divInfo);

        }
        
    }

    
    function getInputValue(elementti){
        let inputValue = document.getElementById(elementti).value;
        return inputValue;
    }
    
    function changeSelectedValue(getValue) {
        switch(getValue){
            case "1":
            return "Students";
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
        }
    }