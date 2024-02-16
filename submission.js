document.addEventListener("DOMContentLoaded", () => {
    // document id's
    const firstName = document.getElementById("fname")
    const lastName = document.getElementById("lname")
    const email = document.getElementById("email")
    const submitButton = document.getElementById("submit");

    // event listeners
    const webURL = "https://script.google.com/macros/s/AKfycbwpQsrVI29IvqprZOxPpWK4sNxv2s94rahByLQqeIwk5Hfksnme52Mm-J6Jhs0G5eftUA/exec"
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        let formData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
        };
        fetch(webURL, {
            method: "POST",
            body: JSON.stringify(formData)
        }).then((response) => {
            console.log(response);
            console.log("Form Submitted!")
        })
    })

}) 