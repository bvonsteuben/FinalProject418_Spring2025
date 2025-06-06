"use strict";


//guessing game
document.querySelector("#game-form").addEventListener("submit", function (e) {
    e.preventDefault(); //prevent form from refreshing the page

    //read user's guess
    var userGuess = parseInt(document.querySelector("#user-number").value);
    //generate random number between 1 and 10
    var randomNumber = Math.floor(Math.random() * 10) + 1;
    // get reference to the user input field
    var userNumberInput = document.querySelector("#user-number");

    // remove any previous error message before displaying new ones
    var existingError = document.querySelector("#game-error");
    if (existingError) {
        existingError.innerHTML = ''; // Clear previous error if any
    }


    //validating input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) { //check if the userGuess is not a number, a number less than 1 or a number greater than 10
        var errorMessage = document.createElement('span');
        errorMessage.classList.add('error');
        errorMessage.textContent = "Please enter a number between 1 and 10."; //display error message if entry is invalid
        var errorContainer = document.querySelector("#game-error");//located error container
        if (errorContainer) {
            errorContainer.appendChild(errorMessage);
        } else {
            console.error("Error container not found.");//log error in console if error container is not found
        }
    } else {
        //if input is valid, display the guess and winning number
        document.querySelector("#guess-output").innerHTML =
            "Your guess: " + userGuess + " | Winning number: " + randomNumber;
        //check if user's guess matches random generated number
        var winMessage = userGuess === randomNumber ?
            "Congratulations, you win! :)" :
            "Try again, better luck next time! (:";
        document.querySelector("#win-message").textContent = winMessage; //selects element with win-message id and updates the content to display appropriate message

        //reset the game
        document.querySelector("#game-form").reset();
    }
});


// error handling functions
function showError(errorId, errorMessage) {
    var errorContainer = document.getElementById(errorId);
    if (errorContainer) {
        errorContainer.textContent = errorMessage;
        errorContainer.classList.add('error');
    }
}

//function to clear error messages 
function clearErrors() {
    var errorElements = document.querySelectorAll('.error');//selects all elements will error class
    //iterate over each error element to clear content
    errorElements.forEach(function (errorElement) {
        errorElement.classList.remove('error');//remove error class to hide error style
        errorElement.textContent = '';//remove error message
    });
}

//contact form validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent default form submission
    clearErrors(); //clear previous errors

    console.log("Form submitted. Starting validation."); //debugging to confirm form submission started

    var isValid = true; //boolean variable set true by default to track overall from validity 

    //validate first name
    var firstName = document.getElementById('firstName').value.trim();
    if (!firstName) { //checks if first name is empty
        showError('firstNameError', 'Please enter your first name.');//displays error if empty
        isValid = false; //if not empty set to false/valid
    }

    //validate Last Name
    var lastName = document.getElementById('lastName').value.trim();
    if (!lastName) {
        showError('lastNameError', 'Please enter your last name.');
        isValid = false;
    }

    //validate preferred contact method
    var preferredContact = document.querySelector('input[name="preferredContact"]:checked');
    if (!preferredContact) { //if no method is selected
        showError('preferredContactError', 'Preferred method of contact is required.'); //show error if not selected
        isValid = false; //if selection is made for sets to false/valid
    }

    //validate email or phone for selected preference
    var emailInput = document.getElementById('emailInput').value.trim(); //get value of email
    var phoneInput = document.getElementById('phoneInput').value.trim(); //get value of phone

    //if email is selected, check if email input is provided
    if (preferredContact && preferredContact.value === 'email' && !emailInput) {
        showError('emailError', 'Please enter your email.'); //show error message if no email is provided
        isValid = false; // form sets to false
    }

    //if phone selected, check if input is valid
    if (preferredContact && preferredContact.value === 'phone' && !phoneInput) {
        showError('phoneError', 'Please enter your phone number.');//show error if invalid input
        isValid = false; //form sets to false 
    }

    //validate comments
    var comments = document.getElementById('comments').value.trim();
    if (!comments) { //if comments are empty show error message
        showError('commentsError', 'Please leave us a comment.');
        isValid = false; //form sets to false
    }

    console.log("Validation complete. Is valid:", isValid); //log final form validity status after all checks

    //if form is valid, process success message
    if (isValid) {
        console.log("Form is valid. Preparing success message.");

        //prepare success message content with user input
        var formDataMessage = `
            <p>First Name: ${firstName}</p>
            <p>Last Name: ${lastName}</p>
            <p>Preferred Contact: ${preferredContact.value}</p>
            <p>Email: ${emailInput || 'N/A'}</p>
            <p>Phone: ${phoneInput || 'N/A'}</p>
            <p>Comments: ${comments}</p>
        `;

        //add formatted form data to success section of page
        document.getElementById('formSub').innerHTML = formDataMessage.trim();

        //show success message by removing hide class and adding show class
        var successSection = document.querySelector("#success");
        successSection.classList.remove("hide");
        successSection.classList.add("show");
        console.log("Success message displayed."); //log that message is now visible

        //clears inputs after displaying the success message
        document.getElementById('contactForm').reset();
    } else { //
        console.log("Form is invalid. Errors displayed."); //if invalid display errors in console
    }
});



//initialize jQuery dark mode 
$(function () {
    
    // handle dark mode preference on page load
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // add event listener to the dark mode toggle button, if it exists
    const toggle = document.getElementById("darkmode");
    if (toggle) {
        toggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("mode", document.body.classList.contains("dark-mode") ? "dark" : "light");
        });
    }
});



//AJAX/API - Load print data from Postman mock server
//using $.getJSON() to retrieve images and descriptions
//hosted images in GitHub repo
$.getJSON("https://d5ffc907-a422-4020-a5b6-171e8b095ad1.mock.pstmn.io/prints", function(data) {
    let accordion = $("#accordion");
  
    data.prints.forEach(function(print) {
      accordion.append(`<h3 class="printTitle">${print.title}</h3>`);
      accordion.append(`
        <div class="printPanel">
          <div class="printInfo">
            <p class="description">${print.description}</p>
            <div class="sizePriceRow">
              <p class="size"><strong>Size:</strong> ${print.size}</p>
              <p class="price"><strong>Price:</strong> ${print.price}</p>
            </div>
          </div>
          <figure>
            <img src="${print.image}" alt="${print.title}">
          </figure>
        </div>
      `);
      
    });
  
    // re-initialize accordion
    accordion.accordion({
      heightStyle: "content",
      collapsible: true,
      active: 0 
    });
  }).fail(function(jqxhr, textStatus, error) {
    console.error("Error loading API data:", textStatus, error);
  });
  
  



//carousel function
$(document).ready(function(){
    $('.carousel').slick({
      dots: true,
      arrows: true,
      autoplay: false, 
      adaptiveHeight: true
    });
  });
  