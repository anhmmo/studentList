'use strict';
    
    const KEY_NAME = "thiskey";

    function getInputValue(elementti){
        let inputValue = document.getElementById(elementti).value;
        return inputValue;
    }

    var listStudents = {
        dataList : [],
        add: function(student){
            this.dataList.push(student)
        },
        save: function(){
            const jsonData = JSON.stringify(this.dataList);
            localStorage.setItem(KEY_NAME, jsonData);
        }

    };

    const formAuto = document.getElementById('main-form');
    formAuto.addEventListener('submit', function(film3) {
    film3.preventDefault();
});

    let buttonClicked = document.getElementById("submit");
    buttonClicked.addEventListener("click", function(film){
        film.preventDefault();
        let name = getInputValue("name");
        let address = getInputValue("address");
        let phone = getInputValue("phone");
        let email = getInputValue("email");
        let age = getInputValue("age");
        let selected = changeSelectedValue(getInputValue("selectOption"));
      
        listStudents.add(
            {
                name: name,
                address: address,
                phone: phone,
                email: email,
                age: age,
                job: selected
            }
        );

        
        
        listStudents.save();
    });
    

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