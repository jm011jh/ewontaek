$(window).ready(function(){
const svMenu = document.getElementById("svMenu")
const svPage = document.getElementById("svPage")
const svMenuLi = svMenu.querySelectorAll("li")
const svPageLi = svPage.querySelectorAll("li")

svMenuLi.forEach(function(el,i){
    
    el.addEventListener("click",function(){
        for(j of svMenuLi){j.classList.remove("on")}
        for(k of svPageLi){k.classList.remove("on")}
        svMenuLi[i].classList.add("on")
        svPageLi[i].classList.add("on")
    })

})

    var page_url = window.location.href;
    var index = page_url.substring(page_url.lastIndexOf("#") + 1)

    if(!isNaN(index)){
        console.log("is nana")
        for(j of svMenuLi){j.classList.remove("on")}
        for(k of svPageLi){k.classList.remove("on")}
        svMenuLi[index].classList.add("on")
        svPageLi[index].classList.add("on")
    }else{
        svMenuLi[0].classList.add("on")
        svPageLi[0].classList.add("on")  
    }
})