document.querySelector("form").onsubmit = function(e) {
    e.preventDefault(); // stop page reload

    let name = document.getElementById("fname").value;
    let email = document.getElementById("email").value;

   // document.getElementById("fdname").textContent = "Welcome " + name + " you are now checked in";
   // document.querySelector("form").reset();
    
  
}