const url = "http://ieeefaqbot.centralus.azurecontainer.io:90/chatbot"

document.querySelector(".chatbot-button").addEventListener("click", () => {
    if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: none;") {
        document.querySelector(".chatbot-wrap").setAttribute("style", "display: block;")
        document.querySelector(".chatbot-button").innerHTML = "<img src='images/cross.svg'>"
        document.querySelector("textarea").focus();
    }
    else if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: block;") {
        document.querySelector(".chatbot-wrap").setAttribute("style", "display: none;")
        document.querySelector(".chatbot-button").innerHTML = "<img src='images/chat.svg'>"
    }
})
document.querySelector(".chatbot-nav-cross").addEventListener("click", () => {
    if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: block;") {
        document.querySelector(".chatbot-wrap").setAttribute("style", "display: none;")
        document.querySelector(".chatbot-button").innerHTML = "<img src='images/chat.svg'>"
    }
})
document.querySelector(".chatbot-footer-menu-section").addEventListener("click", () => {
    if (document.querySelector("#chatbot-body").className == "chatbot-body-full") {
        document.querySelector(".chatbot-footer-up").setAttribute("style", "transform: rotate(180deg);")
        document.querySelector("#chatbot-body").className = "chatbot-body-small"
        document.querySelector(".chatbot-menu").setAttribute("style", "display: block;")
        document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
    }
    else if (document.querySelector("#chatbot-body").className == "chatbot-body-small") {
        document.querySelector(".chatbot-footer-up").setAttribute("style", "transform: rotate(0deg);")
        document.querySelector("#chatbot-body").className = "chatbot-body-full"
        document.querySelector(".chatbot-menu").setAttribute("style", "display: none;")
        document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
    }
})

document.querySelector(".chatbot-send").addEventListener("click", () => {
    if (document.querySelector("#chatbot-input-text").value != "") {
        document.querySelector("#chatbot-body").innerHTML += "<div class='text-right'><div class='chatbot-chat chatbot-chat-user'>" + document.querySelector("#chatbot-input-text").value + "</div></div>"
        getData(document.querySelector('#chatbot-input-text').value)
        document.querySelector("#chatbot-input-text").value = ""
    }
})

function send(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (document.querySelector("#chatbot-input-text").value != "") {
            document.querySelector("#chatbot-body").innerHTML += "<div class='text-right'><div class='chatbot-chat chatbot-chat-user'>" + document.querySelector("#chatbot-input-text").value + "</div></div>"
            getData(document.querySelector('#chatbot-input-text').value)
            document.querySelector("#chatbot-input-text").value = "";
        }
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key == '/') {

        if (document.activeElement.tagName != "TEXTAREA") {
            event.preventDefault();
        }
        if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: block;") {
            document.querySelector("textarea").focus();
        }
    }

    else if (event.key == "Escape") {
        document.querySelector("textarea").blur();
    }
})

async function getData(user_query) {

    var send = await axios.post(`${url}`,
        {
            user_input: user_query,
            model_selection: 1
        })

    var reply = await send.data["output to user"]

    document.querySelector("#chatbot-body").innerHTML += "<div class='d-flex chatbot-chat-ieee-vit-wrap'><img class='chatbot-chat-ieee-vit-logo-img' src='images/favicon.png'><div class='chatbot-chat-ieee-vit-text'>IEEE VIT · Bot</div></div><div><div class='chatbot-chat chatbot-chat-ieee-vit'>"+ reply +"</div></div>"
    document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
    console.log(reply)
}

document.querySelector(".about-us").addEventListener("click", () => {
    if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: block;") {
        document.querySelector(".chatbot-wrap").setAttribute("style", "display: none;")
        document.querySelector(".chatbot-button").innerHTML = "<img src='images/chat.svg'>"
    }
})