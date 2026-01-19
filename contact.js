document.getElementById("myButton").onclick = function() {

    let first = document.getElementById("fname").value;
    let last = document.getElementById("lname").value;
    let Address = document.getElementById("address").value;
    let Phone = document.getElementById("phone").value;
    let Email = document.getElementById("email").value;

    // display on screen
    document.getElementById("fname_output").textContent = first;
    document.getElementById("lname_output").textContent = last;
    document.getElementById("address_output").textContent = Address;
    document.getElementById("phone_output").textContent = Phone;
    document.getElementById("email_output").textContent = Email;

    // save in localStorage
    localStorage.setItem("first", first);
    localStorage.setItem("last", last);
    localStorage.setItem("address", Address);
    localStorage.setItem("phone", Phone);
    localStorage.setItem("email", Email);

    // clear form
    document.querySelector("form").reset();
};
//loads local storage data
document.getElementById("loadButton").onclick = function() {
    document.getElementById("fname_output").textContent = localStorage.getItem("first");
    document.getElementById("lname_output").textContent = localStorage.getItem("last");
    document.getElementById("address_output").textContent = localStorage.getItem("address");
    document.getElementById("phone_output").textContent = localStorage.getItem("phone");
    document.getElementById("email_output").textContent = localStorage.getItem("email");
};

// test
localStorage.setItem("name", "bob");
console.log(localStorage.getItem("name"));
