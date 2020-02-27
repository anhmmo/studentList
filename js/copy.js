// copy student info
function onCopyStudentInfo(info){
    preventItemBoxEventInvoked (info);
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
        saveScrollNumber(info);
        window.location.reload();
    }, 600);
    
}