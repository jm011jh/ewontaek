var menuList = ["예원소개", "업무분야", "상담문의", "오시는길"]
var menuLink = ["about", "service", "contact", "office"]

const email = "lawyewon@naver.com"
const address = "수원시 영통구 광교중앙로 248번길 7-3<br>우연법전프라자 701호"
const phone = "010-2473-1275"
const copyRight = "Copyright © 2022. 법률사무소 예원 All right reserved."
const companyInfo = {
    title : "예원법률사무소",
    person : "대표 변호사 : 이원택",
    bsNumber : "사업자번호 : 271-13-01862",
    address : "주소 : 수원시 영통구 광교중앙로 248번길 7-3 우연법전프라자 701호",
    email : "이메일 : lawyewon@naver.com",
    phone : "전화 : 010-2473-1275",
}
const snsInfo = {
    naver : "http://blog.naver.com/lawyewon",
}
// const businessNumber = "271-13-01862"

async function makeFooter() {

    let footerPromise = new Promise(function(resolve,reject){
        class CustomFooter extends HTMLElement {
            connectedCallback() {

                let container = document.createElement("div")
                container.classList.add("footer--container")
                this.appendChild(container)

                let wrap = document.createElement("div")
                wrap.classList.add("footer--wrap")
                wrap.classList.add("public--wrap")
                container.appendChild(wrap)

                let snsBox = document.createElement("div")
                snsBox.classList.add("footer--snsBox")
                for(let key in snsInfo){
                    let thisKey = String(key);
                    let thisValue = String(snsInfo[key])

                    let thisA = document.createElement("a")
                    thisA.setAttribute("href",thisValue)
                    thisA.setAttribute("target","blank")
                    snsBox.appendChild(thisA)
                    let thisImg = document.createElement("img")
                    thisImg.setAttribute("src",`./common/image/icon_${thisKey}.png`)
                    thisImg.setAttribute("alt",`move to ${thisKey} sns link`)
                    thisA.appendChild(thisImg)
                }
                wrap.appendChild(snsBox)

                let textBox = document.createElement("div")
                textBox.classList.add("footer--textBox")
                wrap.appendChild(textBox)

                for(let key in companyInfo){
                    let thisKey = String(key);
                    let thisValue = String(companyInfo[key])
                    let thisBox = document.createElement("div")
                    let thisText = document.createElement("p")
                    thisBox.classList.add(`footer--${thisKey}`)
                    thisText.innerHTML = thisValue
                    thisBox.appendChild(thisText)
                    textBox.appendChild(thisBox)
                }

                let copyBox = document.createElement("div")
                let copyText = document.createElement("p")
                copyText.innerHTML = copyRight
                copyBox.classList.add("footer--copyRight")
                copyText.classList.add("public--wrap")
                copyBox.appendChild(copyText)
                this.appendChild(copyBox)
            }
        }
        resolve(CustomFooter)
    })
    try {
        var footer = await footerPromise;
        customElements.define("custom-footer",footer)
    } catch {
        console.log("error foot")
    }

}
makeFooter();

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

                for (let i = 0; i < menuLink.length; i++) {
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

var lastScrollTop = 0, delta = 15;
$(window).scroll(function(){
    var scrollTop = $(this).scrollTop()
    if(Math.abs(lastScrollTop - scrollTop) <= delta)
    return;
    
    if ((scrollTop > lastScrollTop) && (lastScrollTop>100)) {
        navSW = false;
        $("custom-nav").removeClass("is-show");
        $("custom-nav").removeClass("is-open");
    } else {
        $("custom-nav").addClass("is-show");
    }
    lastScrollTop = scrollTop;
});