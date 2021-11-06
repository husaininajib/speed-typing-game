const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random"
const textDisplay = document.getElementById("text-display")
const textInput = document.getElementById("text-input")

let correct = true

textInput.addEventListener("input", () => {
    const arrayText = textDisplay.querySelectorAll("span")
    const arrayInput = textInput.value.split("")
    arrayText.forEach((letterSpan, index) => {
        const letter = arrayInput[index]
        if (letter == null) {
            letterSpan.classList.remove("correct")
            letterSpan.classList.remove("incorrect")
            correct = false
        } else if (letter === letterSpan.innerText) {
            letterSpan.classList.add("correct")
            letterSpan.classList.remove("incorrect")
        } else {
            letterSpan.classList.add("incorrect")
            letterSpan.classList.remove("correct")
            correct = false
        }
    })
    if (correct) {
        renderNewText()
    }
})

function getRandomText() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}
async function renderNewText() {
    const text = await getRandomText()
    textDisplay.innerHTML = ""
    text.split("").forEach(letter => {
        const letterSpan = document.createElement("span")
        letterSpan.innerText = letter
        textDisplay.appendChild(letterSpan)
    })
    textInput.value = null
}
renderNewText()
