const url = "https://ieee-faq-chatbot.azurewebsites.net/chatbot"

document.querySelector(".chatbot-button").addEventListener("click", () => {
    if (document.querySelector(".chatbot-wrap").classList.value == "chatbot-wrap") {
        document.querySelector(".chatbot-button").innerHTML = "<img class='cross' src='images/cross.svg'>"
        setTimeout(function () {
            document.querySelector(".cross").setAttribute("style", "transform: translate3d(0, 0, 0) rotate(90deg);")
        }, 0.01);
        $(".chatbot-wrap").addClass('block').outerWidth()
        $(".chatbot-wrap").addClass('fade-in')
        document.querySelector("textarea").focus();
    }
    else {
        document.querySelector(".cross").removeAttribute("style")
        setTimeout(function () {
            document.querySelector(".chatbot-button").innerHTML = "<img src='images/chat.svg'>"
            $(".chatbot-wrap").removeClass('fade-in')
        }, 200);
        setTimeout(function () {
            $(".chatbot-wrap").removeClass('block')
        }, 400);

    }
})
document.querySelector(".chatbot-nav-cross").addEventListener("click", () => {
    if (document.querySelector(".chatbot-wrap").classList.value != "chatbot-wrap") {
        setTimeout(function () {
            document.querySelector(".chatbot-button").innerHTML = "<img src='images/chat.svg'>"
            $(".chatbot-wrap").removeClass('fade-in')
        }, 200);
        setTimeout(function () {
            $(".chatbot-wrap").removeClass('block')
        }, 400);
    }
})
document.querySelector(".chatbot-footer-menu-section").addEventListener("click", () => {
    if (document.querySelector("#chatbot-body").className == "chatbot-body-full") {
        document.querySelector(".chatbot-footer-up").setAttribute("style", "transform: rotate(180deg);")
        document.querySelector("#chatbot-body").className = "chatbot-body-small"
        $(".chatbot-menu").addClass('d-flex').outerWidth()
        $(".chatbot-menu-li").addClass('fade-in')
        document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
        document.querySelectorAll(".chatbot-menu-li").forEach((element) => {
            element.classList.remove("chatbot-menu-li")
            element.classList.add("chatbot-menu-li-open")
        })
    }
    else if (document.querySelector("#chatbot-body").className == "chatbot-body-small") {
        $(".chatbot-menu-li-open").removeClass('fade-in')
        setTimeout(function () {
            document.querySelector("#chatbot-body").className = "chatbot-body-full"
            $(".chatbot-menu").removeClass('d-flex')
        }, 300);
        document.querySelector(".chatbot-footer-up").setAttribute("style", "transform: rotate(0deg);")
        document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
        document.querySelectorAll(".chatbot-menu-li-open").forEach((element) => {
            element.classList.remove("chatbot-menu-li-open")
            element.classList.add("chatbot-menu-li")
        })
    }
})

document.querySelector(".chatbot-send").addEventListener("click", () => {
    if (document.querySelector("#chatbot-input-text").value.trim() != "") {
        document.querySelector("#chatbot-body").innerHTML += "<div class='text-right'><div class='chatbot-chat chatbot-chat-user'>" + document.querySelector("#chatbot-input-text").value.trim() + "</div></div>"
        getData(document.querySelector('#chatbot-input-text').value.trim())
        document.querySelector("#chatbot-input-text").value = ""
    }
})

function send(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (document.querySelector("#chatbot-input-text").value.trim() != "") {
            document.querySelector("#chatbot-body").innerHTML += "<div class='text-right'><div class='chatbot-chat chatbot-chat-user'>" + document.querySelector("#chatbot-input-text").value.trim() + "</div></div>"
            document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
            getData(document.querySelector('#chatbot-input-text').value.trim())
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

    document.querySelector("#chatbot-body").innerHTML += "<div class='d-flex chatbot-chat-ieee-vit-wrap'><img class='chatbot-chat-ieee-vit-logo-img' src='images/chatbot_ieee_logo.svg'><div class='chatbot-chat-ieee-vit-text'>IEEE VIT · Bot</div></div><div><div class='loading-dots-wrapper chatbot-chat chatbot-chat-ieee-vit'><div class='loading-dots'>  <div class='loading-dots--dot'></div>  <div class='loading-dots--dot'></div> <div class='loading-dots--dot'></div></div></div>"
    document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
    try {
        var send = await axios.post(`${url}`,
            {
                user_input: user_query,
                model_selection: 1
            })

        var reply = await send.data["output to user"]
        console.log(reply)

        document.querySelector(".loading-dots-wrapper").remove()
        document.querySelector("#chatbot-body").innerHTML += "<div class='chatbot-chat chatbot-chat-ieee-vit'>" + reply + "</div></div>"
    }
    catch (error) {
        console.error("Error: ", error)
        document.querySelector(".loading-dots-wrapper").remove()
        document.querySelector("#chatbot-body").innerHTML += "<div class='chatbot-chat chatbot-chat-ieee-vit'>The server didn't respond. Could you please try again?</div></div>"

    }

    document.querySelector("#chatbot-body").scrollTo(0, (document.querySelector("#chatbot-body").scrollHeight))
}

document.querySelector(".about-us").addEventListener("click", () => {
    if (document.querySelector(".chatbot-wrap").classList.value != "chatbot-wrap") {
        document.querySelector(".cross").removeAttribute("style")
        setTimeout(function () {
            document.querySelector(".chatbot-button").innerHTML = "<img src='images/chat.svg'>"
            $(".chatbot-wrap").removeClass('fade-in')
        }, 200);
        setTimeout(function () {
            $(".chatbot-wrap").removeClass('block')
        }, 400);
    }
})

document.querySelector("#chatbot-input-text").addEventListener("input", () => {
    const value = document.querySelector("#chatbot-input-text").value
    if (!value) {
        document.querySelector(".chatbot-send").setAttribute("style", "opacity: 0.5")
        return
    }

    const trimmed = value.trim()

    if (trimmed) {
        document.querySelector(".chatbot-send").setAttribute("style", "opacity: 1")
    }
})