document.addEventListener("DOMContentLoaded", () => {
    // document id's
    const firstName = document.getElementById("fname")
    const lastName = document.getElementById("lname")
    const email = document.getElementById("email-input")
    const submitButton = document.getElementById("submit");
    const signUpForm = document.getElementById('sign-up-form');

    // event listeners // 
    const webURL = 'https://script.google.com/macros/s/AKfycbx6p1Z0RVA_6nWO3EyqL7Gw-k_6F4jFFwM3CU9AjWkzo7SDrvU09s-JykKKklQ3QMgMWQ/exec'; 
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Form Submitted!");
        signUpForm.classList.remove('opened');

        // check if required fields are empty
        if (firstName.value.trim() === '' || lastName.value.trim() === '' || email.value.trim() === '') {
            alert("Please fill out all required fields.");
            return; // exit the function if any required field is empty
        }
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
