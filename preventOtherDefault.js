//this function prevent other event working when an popup open
function preventOtherFunctionByDefault () {
    
    for (let index = 0; index < Student.list.length; index++) {
        document.getElementById("delete"+index).onclick = "";
        document.getElementById("edit"+index).onclick = "";
        document.getElementById("copy"+index).onclick = "";
        document.getElementById("info"+index).onclick = "";
    }
    document.getElementById("submit").removeEventListener("click",submitClickHandle);
    document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault()
    });
}