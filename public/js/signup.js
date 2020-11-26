/* global toastMessage */

// Getting references to our form and input
const $signUpForm = $(".signup");

// When the signup button is clicked, we validate the email and password are not blank
$signUpForm.on("submit", (event) => {

  event.preventDefault();
  //const userData = $(event.currentTarget).serializeArray();
  const formEmail = $("#form_email").val();
  const formPassword = $("#form_password").val();
  const formPassword2 = $("#form_password2").val();
  console.log(formEmail, formPassword, formPassword2);
  const userData = {
    email: formEmail,
    password: formPassword,
    password2: formPassword2
  };

  // const userData = userDataArray.reduce((userData, item) => ({ userData, [item.name]: item.value }), {});
  // console.log(JSON.stringify(userData));

  if (!userData.email || !userData.password || !userData.password2) {
    alert("Testing signing up button");
    return;
  }
  // If we have an email and password, run the signUpUser function
  // eslint-disable-next-line no-use-before-define
  signUpUser(userData);
  event.currentTarget.reset();
});

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function signUpUser({ email, password, password2 }) {

  $.post("/api/signup", {
    email: email,
    password: password,
    password2: password2
  })
    .then((data) => {
      //
      toastMessage("success", `Thanks, ${data.name}. Redirecting in 3 sec`);
      setTimeout(() => window.location.replace("/public_chat"), 3000);
    })
    .catch((err) => toastMessage("error", err.responseText));
}
