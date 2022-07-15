(function () {
    // get all data in form and return object
    const inputMessage = document.getElementById("message")
    const menu = document.getElementById("menu");
    
    inputMessage.addEventListener("keyup",checkByte);
    var message = '';
    var max_message_byte = 600;

    function count(message){
        var totalByte = 0;
        for(var index = 0, length = message.length; index < length; index++){
            var currentByte = message.charCodeAt(index);
            (currentByte>128) ? totalByte += 2 : totalByte++;
        }
        return totalByte;
    }
    function checkByte(event){
        const totalByte = count(event.target.value);

        if(totalByte <= max_message_byte){
            message = event.target.value;
        }else{
            alert("300자 까지 전송가능합니다.")
            event.target.value = message;
        }
    }
    function getFormData(form) {
        var elements = form.elements;
        var honeypot;

        var fields = Object.keys(elements).filter(function (k) {
            if (elements[k].name === "honeypot") {
                honeypot = elements[k].value;
                return false;
            }
            return true;
        }).map(function (k) {
            if (elements[k].name !== undefined) {
                return elements[k].name;
                // special case for Edge's html collection
            } else if (elements[k].length > 0) {
                return elements[k].item(0).name;
            }
        }).filter(function (item, pos, self) {
            return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function (name) {
            var element = elements[name];

            // singular form elements just have one value
            formData[name] = element.value;

            // when our element has multiple items, get their values
            if (element.length) {
                var data = [];
                for (var i = 0; i < element.length; i++) {
                    var item = element.item(i);
                    if (item.checked || item.selected) {
                        data.push(item.value);
                    }
                }
                formData[name] = data.join(', ');
            }
        });

        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail
            = form.dataset.email || ""; // no email by default

        return { data: formData, honeypot: honeypot };
    }
    function handleFormSubmit(event) {  // handles form submit without any jquery
        const nameVal = document.getElementById("name").value
        const messageVal = document.getElementById("message").value
        const telVal = document.getElementById("tel").value
        const agreeVal = document.getElementById("agreeCheck").checked
        const menuVal = menu.value

        //"입력안됨" 문구들
        const nameNg = document.getElementById("nameNg")
        const messageNg = document.getElementById("messageNg")
        const menuNg = document.getElementById("menuNg")
        const telNg = document.getElementById("telNg")
        const checkNg = document.getElementById("checkNg")
        event.preventDefault();
        
        var name_sw = false;
        var message_sw = false;
        var tel_sw = false;
        var check_sw = false;
        var menu_sw = false;

        //"입력안됨"문구들 초기화
        nameNg.classList.remove("ng-show")
        messageNg.classList.remove("ng-show")
        menuNg.classList.remove("ng-show")
        telNg.classList.remove("ng-show")
        checkNg.classList.remove("ng-show")
        //"입력항목"하나씩 체크 후 만족하지 못할 경우 "입력안됨" 출력
        if(nameVal == ""){
            nameNg.classList.add("ng-show")
            name_sw = false;
        }else{name_sw = true;}

        if(messageVal == ""){
            messageNg.classList.add("ng-show")
            message_sw = false;
        }else{message_sw = true;}

        if(telVal == ""){
            telNg.classList.add("ng-show")
            tel_sw = false;
        }else{tel_sw = true;}

        if(menuVal == "basic"){
            menuNg.classList.add("ng-show")
            menu_sw = false;
        }else{menu_sw = true;}

        if(!agreeVal){
            checkNg.classList.add("ng-show")
            check_sw = false;
        }else{check_sw = true;}
        // we are submitting via xhr below
        //모든 입력항목값의 조건 만족 시 이하 실행
        if(name_sw == true && message_sw == true && tel_sw == true && check_sw == true){
    
    
            var form = event.target;
            var formData = getFormData(form);
            var data = formData.data;
    
            // If a honeypot field is filled, assume it was done so by a spam bot.
            if (formData.honeypot) {
                return false;
            }
    
            disableAllButtons(form);
            var url = form.action;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    form.reset();
                    var formElements = form.querySelector(".form-elements")
                    if (formElements) {
                        // formElements.style.display = "none";
                         // hide form
                    }
                    var popupSuccess = document.querySelector(".contact--bnr-success");
                    if (popupSuccess) {
                        popupSuccess.style.display = "block";
                    }
                }
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function (k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);
        }else{
            console.log("these are some empty...")
        }
    }

    function loaded() {
        // bind to the submit event of our form
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
})();