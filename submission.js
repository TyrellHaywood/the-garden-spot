document.addEventListener("DOMContentLoaded", () => {
    // document id's
    const firstName = document.getElementById("fname")
    const lastName = document.getElementById("lname")
    const email = document.getElementById("email-input")
    const submitButton = document.getElementById("submit");

    // event listeners
    const webURL = 'https://script.google.com/macros/s/AKfycbwnnXLPii6tPuTZuQ3R4ZXSiLmFZN9bWKEj0_guO-h9AOif9Rbmb0K_s5moeKC0o-CtrQ/exec'; 
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
            if (response.ok) {
                console.log("Form Submitted!");
            } else {
                console.log("Form submission failed:", response.status);
            }
        }).catch((error) => {
            console.error('Error submitting form:', error);
        });
    });

});
