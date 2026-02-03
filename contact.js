// SAVE CONTACT
document.getElementById("myButton").onclick = function () {
    const first = document.getElementById("fname").value;
    const last = document.getElementById("lname").value;
    const Address = document.getElementById("address").value;
    const Phone = document.getElementById("phone").value;
    const Email = document.getElementById("email").value;

    // Load existing contacts or create empty list
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Add new contact
    contacts.push({ first, last, Address, Phone, Email });

    // Save back to localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Clear form
    document.getElementById("contactForm").reset();
};



// LOAD & DISPLAY ALL CONTACTS
document.getElementById("loadButton").onclick = function (event) {
    event.preventDefault();

    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let output = "";

    contacts.forEach((c, index) => {
        output += `
            <div class="contact-card">
                <p><strong>Contact ${index + 1}</strong></p>
                <p>${c.first} ${c.last}</p>
                <p>${c.Address}</p>
                <p>${c.Phone}</p>
                <p>${c.Email}</p>
            </div>
            <hr>
        `;
    });

    document.getElementById("allContacts_output").innerHTML = output;
};
