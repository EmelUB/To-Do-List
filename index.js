


const addListEl = document.querySelector(".addList");
const addBtnEl = document.querySelector(".addBtn");
const cloneDivEl = document.querySelector(".cloneDiv");
const inputEl = document.querySelector(".input");

window.onload=function(){
    const savedData = localStorage.getItem("todoData");
    if(savedData){
        document.querySelector(".hedefDiv").innerHTML = savedData;
        attachEventListenersToCloseButtons(); // Sayfa yenilendikten sonra etkinlik dinleyicilerini tekrar ekle
    }

    restoreCheckboxStates();
};

window.onbeforeunload=function(){
    saveCheckboxStates();
};

function attachEventListenersToCloseButtons() {
    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach((closeEl) => {
        closeEl.addEventListener("click", () => {
            const clonedDiv = closeEl.closest(".cloneDiv");
            clonedDiv.remove();
            updateLocalStorage();
        });
    });
};

function saveCheckboxStates(){
    var checkboxes = document.querySelectorAll(".check");
    checkboxes.forEach(function(checkbox,index){
        localStorage.setItem("checkbox_" + index,checkbox.checked);
    });
};

function restoreCheckboxStates(){
    var checkboxes = document.querySelectorAll(".check");
    checkboxes.forEach(function(checkbox,index){
        var savedState = localStorage.getItem("checkbox_" + index);
        if(savedState!==null){
            checkbox.checked = (savedState==="true");
        };
    });
};


addBtnEl.addEventListener("click",()=>{
    cloneDivEl.style.visibility = "visible";
    cloneProcess();
    cloneDivEl.remove();
    inputEl.value="";
    attachEventListenersToCloseButtons(); // Sayfa yenilendikten sonra etkinlik dinleyicilerini tekrar ekle
    updateLocalStorage();

});

const resetEl = document.querySelector(".reset");
resetEl.addEventListener("click",()=>{
    const hedefDivEl = document.querySelector(".hedefDiv");
    hedefDivEl.innerHTML="";
    updateLocalStorage();
});


function cloneProcess(){
    var clonedDiv = cloneDivEl.cloneNode(true);
    const hedefDivEl = document.querySelector(".hedefDiv");
    const listemEl = clonedDiv.querySelector(".listem");
    hedefDivEl.appendChild(clonedDiv);
    listemEl.textContent = inputEl.value;
    
    
    
    const closeEl = clonedDiv.querySelector(".close");
    closeEl.addEventListener("click",()=>{
        clonedDiv.remove();
        updateLocalStorage();
    });

    const checkEl = clonedDiv.querySelector(".check");
    checkEl.addEventListener("change",()=>{
        listemEl.style.textDecoration = checkEl.checked ? "line-through" : "none";
        updateLocalStorage();
    });


};

function updateLocalStorage(){
    const hedefDivData = document.querySelector(".hedefDiv").innerHTML;
    localStorage.setItem("todoData", hedefDivData);
};



