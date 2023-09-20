document.addEventListener("DOMContentLoaded",function(){
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const tellMeButton = document.getElementById("tellMeButton");

    tellMeButton.addEventListener("click",function(){
        page1.classList.add("hidden");
        page2.classList.remove("hidden");
    
    })
});