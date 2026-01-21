// SAVE CONTACT
document.getElementById("myButton").onclick = function() {

    let first = document.getElementById("fname").value;
    let last = document.getElementById("lname").value;
    let Address = document.getElementById("address").value;
    let Phone = document.getElementById("phone").value;
    let Email = document.getElementById("email").value;

    // Load existing contacts or create empty list
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Add new contact
    contacts.push({
        first,
        last,
        Address,
        Phone,
        Email
    });

    // Save back to localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Clear form
    document.querySelector("form").reset();
};



// LOAD & DISPLAY ALL CONTACTS
document.getElementById("loadButton").onclick = function(event) {
    event.preventDefault();

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    let output = "";

    contacts.forEach((c, index) => {
        output += `
            <p><strong>Contact ${index + 1}</strong></p>
            <p>${c.first} ${c.last}</p>
            <p>${c.Address}</p>
            <p>${c.Phone}</p>
            <p>${c.Email}</p>
            <hr>
        `;
    });

    document.getElementById("allContacts_output").innerHTML = output;
};
