$(document).ready(function () {
  // Getting references to our form and input
  const logInForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // Declare needed functions
  const handleLoginErr = (err) => {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  };

  // Does a post to the login route. If successful, we are redirected to the chat page
  // Otherwise we log any errors
  const logInUser = (email, password) => {
    $.post("/api/login", {
      email: email,
      password: password,
    })
      .then(() => {
        window.location.replace("/chat");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  };
  // When the signup button is clicked, we validate the email and password are not blank
  logInForm.on("submit", (event) => {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    logInUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });
});
