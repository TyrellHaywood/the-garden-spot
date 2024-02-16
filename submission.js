document.addEventListener("DOMContentLoaded", () => {
    // document id's
    const firstName = document.getElementById("fname")
    const lastName = document.getElementById("lname")
    const email = document.getElementById("email")
    const submitButton = document.getElementById("submit");

    // event listeners
    const webURL = '/api'; // proxy server url
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