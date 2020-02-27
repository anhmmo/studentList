// scroll to position where it is current view
function scrollToMyView(elementti) {
    let elmnt = document.getElementById(elementti);
    if(elmnt !== null)
    {
        elmnt.scrollIntoView();
    }
  }


  //save scroll number to localStorage
function saveScrollNumber (luku) {
    thisSaveScrollNumber = luku;
    const scrollNumber = JSON.stringify(thisSaveScrollNumber);
    localStorage.setItem(storeScrollKey, scrollNumber);
}

//get position number of item then call scrollToView function

let getScroll = parseInt(localStorage.getItem(storeScrollKey)); 
// or +(localStorage.getItem("SCROLL")) to convert string to int

--getScroll;

getScroll==-1 ? getScroll = 0 : getScroll;
scrollToMyView("scroll" + getScroll) ? (scrollToMyView("scroll" + 0)) : (scrollToMyView("scroll" + getScroll)) ; 


//scroll to top icon view
let iconToTheTop = document.getElementById("toTheTop");
iconToTheTop.style.display = "none";
//call onscroll event when user scroll down more than 500px, icon show if scroll less than 500x icon display none.
listItem.onscroll = () => listItem.scrollTop > 500 ? iconToTheTop.style.display = "block" : iconToTheTop.style.display = "none";
saveScrollNumber(1);