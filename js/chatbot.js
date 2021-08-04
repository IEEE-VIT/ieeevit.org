document.querySelector(".chatbot-button").addEventListener("click", () => {
    if (document.querySelector(".chatbot-wrap").getAttribute("style") == "display: none;") {
        document.querySelector(".chatbot-wrap").setAttribute("style", "display: block;")
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