let colorMenuBox = document.getElementById("colorMenu");
let colorMenuSetting = document.getElementById("colorSetting");

colorMenuSetting.addEventListener("click", openColorMenuBox);

function openColorMenuBox() {
    let isThisClassUsed = colorMenuBox.getAttribute("class");
   
    if(isThisClassUsed == "hideMenu" || isThisClassUsed == "colorMenuHide"){
        colorMenuBox.className = "colorMenuShow";
    }
    else {
        colorMenuBox.className = "colorMenuHide";
    } 
}

//change background color function 
function setFirstTimeBackgroundColor () {
    const colorNumber = JSON.stringify("white");
    localStorage.setItem(storeColor, colorNumber);
    let colorParse = JSON.parse(colorNumber);
    document.body.style.backgroundColor = colorParse;
    return colorParse;
}



let redColor = document.getElementById("changeColorRed");
//it look same redColor.addEventListener("click", function(){ changeColor("#F44336"); });
redColor.addEventListener("click", () => changeColor("#F44336"));
let greenColor = document.getElementById("changeColorGreen");
greenColor.addEventListener("click", () => changeColor("#4CAF50"));
let blueColor = document.getElementById("changeColorBlue");
blueColor.addEventListener("click", () => changeColor("#2196F3"));
let whiteColor = document.getElementById("changeColorWhite");
whiteColor.addEventListener("click", () => changeColor("#ffffff"));
let violetColor = document.getElementById("changeColorViolet");
violetColor.addEventListener("click", () => changeColor("#9C27B0"));
let yellowColor = document.getElementById("changeColorYellow");
yellowColor.addEventListener("click", () => changeColor("#FFEB3B"));
let pinkColor = document.getElementById("changeColorPink");
pinkColor.addEventListener("click", () => changeColor("#E91E63"));
let grayColor = document.getElementById("changeColorGray");
grayColor.addEventListener("click", () => changeColor("#9E9E9E"));
let orangeColor = document.getElementById("changeColorOrange");
orangeColor.addEventListener("click", () => changeColor("#FF9800"));
let purpleColor = document.getElementById("changeColorPurple");
purpleColor.addEventListener("click", () => changeColor("#673AB7"));


function changeColor(color) {
    const newColor = JSON.stringify(color);
    localStorage.setItem(storeColor, newColor);
    window.location.reload();
}
