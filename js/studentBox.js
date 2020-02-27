//info--popup--student

let timeOutF;


if(screen.height<605){
    document.getElementById("hide-this-gallery").style.visibility = "hidden";
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


//popup close click
document.getElementById("popup-close").addEventListener("click", closeBtn);
function closeBtn(){
    document.getElementById("popup-section").className = "edit__popup";
    window.location.reload();
}

