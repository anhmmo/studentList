
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
    let selectedElementName = selectMainForm2[index].querySelector(name);
   
    let falseIcon = selectIElement2[0];
    let trueIcon = selectIElement2[1];
    let requiredIcon = selectIElement2[2];
    
    selectedElementName.addEventListener("focus", checkTyping);
    selectedElementName.addEventListener("input", checkInputForm);
    selectedElementName.addEventListener("blur", checkIfNotType);

  function checkIfNotType () {
      selectedElementName.placeholder = this.name + " field cannot be empty";
      if(this.name=="Email" || this.name =="Name" || this.name =="Age"){
        if(selectedElementName.value.length > 0 && validateEmail(selectedElementName.value) || selectedElementName.value.length > 0 && validateName(selectedElementName.value) || validateAge(selectedElementName.value)) {
            requiredIcon.style.color = "white";
            selectedElementName.style.borderColor = "green";
          }
          else {
            requiredIcon.style.color = "red";
            selectedElementName.style.borderColor = "red";
          }
      }
      else {
        if(selectedElementName.value.length==0) {
            requiredIcon.style.color = "red";
            selectedElementName.style.borderColor = "red";
          }
          else {
            requiredIcon.style.color = "white";
            selectedElementName.style.borderColor = "green";
          }
      }
  }

  function checkInputForm () {
    if(this.name == "Name"){
        
        if (selectInputElement.value.length>0 && validateName(selectInputElement.value)) {
            
            selectNotice.className = "notice-display-none";
            trueIcon.className = "trueIcon fas fa-check";
            falseIcon.className = "hideFormIcon";
            requiredIcon.style.color = "white";
            selectInputElement.style.borderColor = "green";
        }
        else {
            trueIcon.className = "hideFormIcon";
            requiredIcon.style.color = "red";
            selectInputElement.style.borderColor = "red";
        }
    
    }

    else if(this.name=="Email"){
        
        if (selectInputElement3.value.length>0 && validateEmail(selectInputElement3.value)) {
            
            selectNotice4.className = "notice-display-none";
            trueIcon.className = "trueIcon fas fa-check";
            falseIcon.className = "hideFormIcon";
            requiredIcon.style.color = "white";
            selectInputElement3.style.borderColor = "green";
        }
        else {
            
            trueIcon.className = "hideFormIcon";
            requiredIcon.style.color = "red";
            selectInputElement3.style.borderColor = "red";
        }
    
    }

    else if(this.name=="Age"){
        
        if (validateAge(selectInputElement4.value)) {
            
            selectNotice5.className = "notice-display-none";
            trueIcon.className = "trueIcon fas fa-check";
            falseIcon.className = "hideFormIcon";
            requiredIcon.style.color = "white";
            selectInputElement4.style.borderColor = "green";
        }
        else {
            
            trueIcon.className = "hideFormIcon";
            requiredIcon.style.color = "red";
            selectInputElement4.style.borderColor = "red";
        }
    
    }

    else {
    
         if (selectedElementName.value.length>0) {
            selectedElementName.style.borderColor = "green";
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
            selectedElementName.style.borderColor = "red";
          
            trueIcon.className = "hideFormIcon";
            requiredIcon.style.color = "red";
        }
    
    }
  }

    function checkTyping() {
        selectedElementName.placeholder ="";
    }
}
