document.querySelector(".chatbot-button").addEventListener("click", () => {
    if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: none;") {
        document.querySelector(".chatbot-wrap").setAttribute("style", "display: block;")
        document.querySelector("textarea").focus();
    }
    else if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: block;") {
        document.querySelector(".chatbot-wrap").setAttribute("style", "display: none;")
    }
})
document.querySelector(".chatbot-nav-cross").addEventListener("click", () => {
    if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: none;") {
        document.querySelector(".chatbot-wrap").setAttribute("style", "display: block;")
    }
    else if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: block;") {
        document.querySelector(".chatbot-wrap").setAttribute("style", "display: none;")
    }
})
document.querySelector(".chatbot-footer-menu-section").addEventListener("click", () => {
    if (document.querySelector("#chatbot-body").className == "chatbot-body-full") {
        document.querySelector(".chatbot-footer-up").setAttribute("style", "transform: rotate(180deg);")
        document.querySelector("#chatbot-body").className = "chatbot-body-small"
        document.querySelector(".chatbot-menu").setAttribute("style", "display: block;")
    }
    else if (document.querySelector("#chatbot-body").className == "chatbot-body-small") {
        document.querySelector(".chatbot-footer-up").setAttribute("style", "transform: rotate(0deg);")
        document.querySelector("#chatbot-body").className = "chatbot-body-full"
        document.querySelector(".chatbot-menu").setAttribute("style", "display: none;")
    }
})

document.querySelector(".chatbot-send").addEventListener("click", () => {
    if (document.querySelector("#chatbot-input-text").value != "") {
        document.querySelector("#chatbot-body").innerHTML += "<div class='text-right'><div class='chatbot-chat chatbot-chat-user'>" + document.querySelector("#chatbot-input-text").value + "</div></div>"
        document.querySelector("#chatbot-input-text").value = ""
        document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
    }
})

function send(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (document.querySelector("#chatbot-input-text").value != "") {
            document.querySelector("#chatbot-body").innerHTML += "<div class='text-right'><div class='chatbot-chat chatbot-chat-user'>" + document.querySelector("#chatbot-input-text").value + "</div></div>"
            document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
            document.querySelector("#chatbot-input-text").value = "";
        }
    }
}

document.addEventListener("keydown", (event) => {
    if(event.key == '/'){

        if(document.activeElement.tagName != "TEXTAREA")
        {
            event.preventDefault();
        }
        if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: block;") {
            document.querySelector("textarea").focus();
        }
    }

    else if(event.key == "Escape"){
        document.querySelector("textarea").blur();
    }
})