"use strict";


//product switcher
// select DOM elements for the print buttons, print items, and description area
var printBtns = document.querySelectorAll(".printTitleBtn"); // buttons that trigger the display of each print
var printItems = document.querySelectorAll(".printItem");// list of all print items that can be shown/hidden
var description = document.getElementById("printDescription");// the element that will display the description of the selected print

//store descriptions for each print
var descriptions = {
    bangarang: "“RU.FI.OOOOOOOH!” This is your rallying cry to seek adventure, be rebellious, make mistakes, free yourself from the status quo, and be whatever age you feel. This bold black-and-white print might just become your new mantra. So dig deep, channel that cocky little rooster impression, and shout it loud enough to wake everyone the f up: “BANGARANG!”",
    fly: "YES, you CAN! Plus, YOU CAN FIGHT, and best of all, YOU CAN CROW! So check your baggage at the gate and glide weightlessly as you wave goodbye to self-doubt because, *whispers*guess what? “You're doing it, Peter!” If the best way out is through, then the fastest way through is surely to let go and FLY.",
    together: "TWO is ONE, and ONE is NONE. Being prepared means choosing the best team. Can we all pinky-promise to ask for help when needed, trust one another, and celebrate how our differences make us stronger? If we nurture our partnerships, feed them, and give them room to breathe, we can light the way and pass on a torch of support and strength."
};

//function to hide all prints and show the selected print based on id
function togglePrintVisibility(targetId) {
    //iterate over all print items and hide them
    printItems.forEach(function (item) {
        item.classList.remove("visible"); //remove visible class to hide print
        //if the item's ID matches the target ID (print title clicked), show it and update the description
        if (item.id === targetId) {
            item.classList.add("visible");//add visible class to display the print
            description.textContent = descriptions[targetId];//update the description based on the selected print
        }
    });
}

// Event listener for print title buttons
printBtns.forEach(function (btn) {
    //for each title button, add an event listener for the click event
    btn.addEventListener("click", function () {
        //get the target prints ID from the button's data-target attribute
        var targetId = this.getAttribute("data-target");
        console.log("Button clicked for:", targetId); //debugging line to check which button was clicked
        //call the togglePrintVisibility function and pass the targetID to show selected print
        togglePrintVisibility(targetId);
    });
});

//guessing game
document.querySelector("#game-form").addEventListener("submit", function (e) {
    e.preventDefault(); //prevent form from refreshing the page

    //read user's guess
    var userGuess = parseInt(document.querySelector("#user-number").value);
    //generate random number between 1 and 10
    var randomNumber = Math.floor(Math.random() * 10) + 1;
    // Get reference to the user input field
    var userNumberInput = document.querySelector("#user-number");

    // Remove any previous error message before displaying new ones
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


// Error handling functions
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

    // validate email or phone for selected preference
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

    // Validate Comments
    var comments = document.getElementById('comments').value.trim();
    if (!comments) { //if comments are empty show error message
        showError('commentsError', 'Please leave us a comment.');
        isValid = false; //form sets to false
    }

    console.log("Validation complete. Is valid:", isValid); //log final form validity status after all checks

    // If form is valid, process success message
    if (isValid) {
        console.log("Form is valid. Preparing success message.");

        // Prepare success message content with user input
        var formDataMessage = `
            <p>First Name: ${firstName}</p>
            <p>Last Name: ${lastName}</p>
            <p>Preferred Contact: ${preferredContact.value}</p>
            <p>Email: ${emailInput || 'N/A'}</p>
            <p>Phone: ${phoneInput || 'N/A'}</p>
            <p>Comments: ${comments}</p>
        `;

        // Add formatted form data to success section of page
        document.getElementById('formSub').innerHTML = formDataMessage.trim();

        // Show success message by removing hide class and adding show class
        var successSection = document.querySelector("#success");
        successSection.classList.remove("hide");
        successSection.classList.add("show");
        console.log("Success message displayed."); //log that message is now visible

        // clears inputs after displaying the success message
        document.getElementById('contactForm').reset();
    } else { //
        console.log("Form is invalid. Errors displayed."); //if invalid display errors in console
    }
});

//light/dark mode - event listener for click on light/dark mode icon
document.getElementById("darkmode").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

//initialize jQuery UI tabs for prints section
$(function () {
    $("#tabs").tabs();
});


//AJAX/API - Load print data from Postman mock server
//using $.getJSON() to retrieve images and descriptions
//hosted images served from GitHub repo
$.getJSON("https://d5ffc907-a422-4020-a5b6-171e8b095ad1.mock.pstmn.io/prints", function(data) {
    let ids = ["bangarang", "fly", "together"];

    data.prints.forEach(function(print, index) {
        let tabId = ids[index];

        // Build output HTML with image and description
        let output = `
            <figure>
                <img src="${print.image}" alt="${print.title}">
            </figure>
            <p class="description" id="desc-${tabId}">${print.description}</p>
        `;

        // Inject into the tab content panel
        document.getElementById(tabId).innerHTML = output;
    });
}).fail(function(jqxhr, textStatus, error) {
    console.error("Error loading API data:", textStatus, error);
});

