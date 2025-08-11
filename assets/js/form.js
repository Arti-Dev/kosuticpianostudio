addEventListener('submit', (event) => onSubmit(event))

function hideForm() {
    const form = document.getElementById("contactform");
    const wrapper = document.getElementById("contactformwrapper")
    const text = document.createTextNode("Form submitted. Thank you!")
    form.style.display = "none";
    wrapper.append(text)
}

let hasError = false;
function errorMessage(string) {
    if (hasError) return
    const form = document.getElementById("contactform");
    const text = document.createTextNode(string)
    form.prepend(text)
    hasError = true
}

function onSubmit(event) {
    event.preventDefault()
    if (event.target.id === "contactform") {
        const data = new FormData(event.target)

        fetch("https://formspree.io/f/xldlzdzo", {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: data,
        }).then(r => {
            if (r.ok || r.status === 302) {
                hideForm()
            } else if (r.status === 422) {
                errorMessage("Something went wrong. Did you type in your email address correctly?")
                console.log(r)
            } else {
                errorMessage("Something went wrong, and your message has not been sent.")
                console.log(r)
            }
        })
    }
}

