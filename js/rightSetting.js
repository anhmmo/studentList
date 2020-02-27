//loading download

document.getElementById("save-file").addEventListener("click", function() {
    let getData = localStorage.getItem(storeKey);
    download(getData, 'StudentList.txt', 'text/plain');
});

//download all students info button 
function download(text, name, type) {
    let downloadBtn = document.getElementById("download-btn");
    let downloadLoading = document.getElementById("download-loading");
    downloadLoading.style.display = "inline-block";
    document.getElementById("create-btn").style.display = "none";
    setTimeout( function() {
        downloadBtn.style.display = "block";
        
    }
    , 2000);
    let file = new Blob([text], {type: type});
    downloadBtn.href = URL.createObjectURL(file);
    downloadBtn.download = name;
}

// remove all students

document.getElementById("remove-all-students").addEventListener("click", removeAllStudent);
function removeAllStudent () {
    let ner = Student.list;
    const jsonData = JSON.stringify(ner);
    localStorage.setItem("backup", jsonData);
    Student.changeData = [];
    Student.save();
    window.location.reload();
}

// restore all students from differences versions
document.getElementById("restore-default").addEventListener("click", restoreAllDeleteditems);

let rightSetting = document.getElementById("right-setting");
let openSetting = document.getElementById("open-setting");
let saveFile = document.getElementById("save-file");
let removeAll = document.getElementById("remove-all-students");
let restoreDefault = document.getElementById("restore-default");

// open right setting section

openSetting.addEventListener("click", openRightSetting);
function openRightSetting() {
    if(rightSetting.getAttribute("class") === "right-setting" || rightSetting.getAttribute("class") === "right-setting right-setting--hide") {
        rightSetting.className = "right-setting right-setting--open";
        openSetting.className = "open-setting open-setting--open fas fa-users-cog";
        saveFile.className = "save-button save-button--open";
        removeAll.className = "save-button2 save-button2--open";
        restoreDefault.className = "save-button3 save-button3--open";
    }
    else {
        rightSetting.className = "right-setting right-setting--hide";
        openSetting.className = "open-setting open-setting--hide fas fa-users-cog";
        saveFile.className = "save-button save-button--hide";
        removeAll.className = "save-button2 save-button2--hide";
        restoreDefault.className = "save-button3 save-button3--hide";
    }

    
}

