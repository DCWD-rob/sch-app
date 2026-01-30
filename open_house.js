document.addEventListener("DOMContentLoaded", function () {

    // Wait until EmailJS is actually available
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

        document.getElementById("signInForm").addEventListener("submit", function(e) {
            e.preventDefault();

            const params = {
                fname: document.getElementById("fname").value,
                email: document.getElementById("email").value
            };

            emailjs.send("service_3awecfe", "template_95kc0y7", params)
                .then(() => {
                    document.getElementById("fdname").textContent =
                        "Thanks for signing in, " + params.fname;
                })
                .catch((error) => {
                    console.log("EmailJS Error:", error);
                });
        });
    });

});
    
        function toggleMenu() {
            const menu = document.getElementById("menu");
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        }

        // Optional: auto-close after tap
        document.querySelectorAll(".menu a").forEach(link => {
            link.addEventListener("click", () => {
                document.getElementById("menu").style.display = "none";
            });
        });
   


window.emailjs
function toggleMenu() {
            const menu = document.getElementById("menu");
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        }

        // Optional: auto-close after tap
        document.querySelectorAll(".menu a").forEach(link => {
            link.addEventListener("click", () => {
                document.getElementById("menu").style.display = "none";
            });
        });