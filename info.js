function onGetInfoStudent(index){
    preventItemBoxEventInvoked (index);
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