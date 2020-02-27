function onDeleteStudent(index) {
    preventItemBoxEventInvoked (index);
    saveScrollNumber(index);
    let CheckAnswer = confirm("Delete this student ?");
    if(CheckAnswer){
        Student.delete(index);
        Student.save();
    }
    window.location.reload();
}