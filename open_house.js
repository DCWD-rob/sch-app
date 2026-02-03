document.addEventListener("DOMContentLoaded", () => {

    // Wait until EmailJS is available
    function waitForEmailJS(callback) {
        if (typeof emailjs !== "undefined") {
            callback();
        } else {
            console.log("Waiting for EmailJS...");
            setTimeout(() => waitForEmailJS(callback), 100);
        }
    }

    waitForEmailJS(() => {
        console.log("EmailJS loaded");

        const form = document.getElementById("signInForm");
        const message = document.getElementById("fdname");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const params = {
                fname: document.getElementById("fname").value,
                email: document.getElementById("email").value
            };

            emailjs.send("service_3awecfe", "template_95kc0y7", params)
                .then(() => {
                    message.textContent = `Thanks for signing in, ${params.fname}`;
                    form.reset();
                })
                .catch((error) => {
                    console.error("EmailJS Error:", error);
                    message.textContent = "There was an issue sending your sign‑in. Please try again.";
                });
        });
    });

});
