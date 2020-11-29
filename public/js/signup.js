$(document).ready(function () {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const userName = $("input#name-input");
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
  function signUpUser(name, email, password, confirmPwd) {
    if (validatePassword(password, confirmPwd)) {
      $.post("/api/signup", {
        name: name,
        email: email,
        password: password,
      })
        .then(() => {
          window.location.replace("/users");
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
      name: userName.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPwd: confirmPassword.val().trim(),
    };

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPwd
    ) {
      return;
    }
    // If we have all the fields completed, run the signUpUser function
    signUpUser(
      userData.name,
      userData.email,
      userData.password,
      userData.confirmPwd
    );
    userName.val("");
    emailInput.val("");
    passwordInput.val("");
    confirmPassword.val("");
  });
});
