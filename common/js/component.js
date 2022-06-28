var menuList = ["예원소개", "업무분야", "온라인상담", "오시는길"]
var menuLink = ["about", "service", "contact", "office"]
const email = "test@test.com"
const address = "수원시 영통구 광교중앙로 248번길 7-3<br>우연법전프라자 701호"
const phone = "010-2473-1275"

async function makeNav() {

    let navPromise = new Promise(function (resolve, reject) {
        class CustomNav extends HTMLElement {
            connectedCallback() {

                let wrap = document.createElement("div")
                wrap.classList.add("nav--wrap")
                this.appendChild(wrap)

                let navLogoLink = document.createElement("a")
                navLogoLink.innerHTML = "예원법률사무소"
                navLogoLink.setAttribute("href", "/")
                wrap.appendChild(navLogoLink)

                let hamWrap = document.createElement("div")
                hamWrap.classList.add("nav--ham-wrap")
                wrap.appendChild(hamWrap)

                let asideContainer = document.createElement("div")
                asideContainer.classList.add("aside--container")
                hamWrap.appendChild(asideContainer)

                let asideWrap = document.createElement("div")
                asideWrap.classList.add("aside--wrap")
                asideContainer.appendChild(asideWrap)

                let asideList = document.createElement("ul")
                asideList.classList.add("aside--list")
                asideWrap.appendChild(asideList)

                for (let i = 0; i <= 3; i++) {
                    let asideListSpan = document.createElement("span")
                    let asideListItem = document.createElement("li")
                    let asideListItemA = document.createElement("a")
                    let addressRoot = "./"

                    asideListItemA.setAttribute("href", String(addressRoot + menuLink[i].toLowerCase() + ".html"))
                    asideListItemA.innerHTML = menuList[i]

                    asideListItem.appendChild(asideListItemA)
                    asideList.appendChild(asideListItem)
                    asideListItemA.appendChild(asideListSpan)
                }

                let asideText = document.createElement("div")
                asideText.classList.add("aside--text")
                asideWrap.appendChild(asideText)
                
                    let asideEmail = document.createElement("p")
                    asideEmail.classList.add("aside--text-email")
                    asideEmail.innerHTML = email
                    asideText.appendChild(asideEmail)
                    let asideAddress = document.createElement("p")
                    asideAddress.classList.add("aside--text-address")
                    asideAddress.innerHTML = address
                    asideText.appendChild(asideAddress)

                    let asidePhone = document.createElement("p")
                    asidePhone.classList.add("aside--text-phone")
                    asidePhone.innerHTML = phone
                    asideText.appendChild(asidePhone)

                let navHamBtn = document.createElement("div")
                navHamBtn.classList.add("nav--ham-button")
                navHamBtn.id = "navHam"
                hamWrap.appendChild(navHamBtn)

                for (let i = 0; i <= 2; i++) {
                    let navHamBtnSpan = document.createElement("span")
                    navHamBtn.appendChild(navHamBtnSpan)
                }

            }
        }
        resolve(CustomNav)
    })
    try {
        var nav = await navPromise;
        customElements.define("custom-nav", nav)
        const $navHam = document.getElementById("navHam")
        $navHam.addEventListener("click",function(){
            navSwitching();
        })
    } catch {
        console.log("error nav")
    }
}
makeNav();

var navSW = false;
function navSwitching(){
    const el = document.querySelector("custom-nav")
    if(navSW == false){
        navSW = true;
        el.classList.add("is-open")
    } else if(navSW == true) {
        navSW = false;
        el.classList.remove("is-open")
    }

}