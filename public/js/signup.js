$(document).ready(function () {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const confirmPassword = $("input#password-input2");

  // Declare needed functions
  const handleLoginErr = (err) => {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  };
  const validatePassword = (password, confirmPwd) => password === confirmPwd;

  // Does a post to the signup route. If successful, we are redirected to the chat page
  // Otherwise we log any errors
  function signUpUser(email, password, confirmPwd) {
    if (validatePassword(password, confirmPwd)) {
      $.post("/api/signup", {
        email: email,
        password: password,
      })
        .then(() => {
          window.location.replace("/chat");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    } else {
      alert("Please ensure passwords match.");
    }
  }
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPwd: confirmPassword.val().trim(),
    };

    if (!userData.email || !userData.password || !userData.confirmPwd) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.confirmPwd);
    emailInput.val("");
    passwordInput.val("");
    confirmPassword.val("");
  });
});
