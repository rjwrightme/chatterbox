/* global toastMessage */
// Getting references to our form and inputs
const loginForm = $("form.login");

// When the form is submitted, we validate there's an email and password entered
loginForm.on("submit", (event) => {
  event.preventDefault();
  const userDataArray = $(event.currentTarget).serializeArray();

  const userData = userDataArray.reduce((userData, item) => ({userData, [item.name]: item.value }), {});

  if (!userData.email || !userData.password) {
    return;
  }

  // If we have an email and password we run the loginUser function and clear the form
  // eslint-disable-next-line no-use-before-define
  loginUser(userData);
  event.currentTarget.reset();
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser({ email, password }) {
  $.post("/api/login", {
    email: email,
    password: password,
  })
    .then((userData) => {
      toastMessage("success", `Thanks, ${userData.name}. Redirecting in 3 sec`);
      setTimeout(() => window.location.replace("/members"), 3000);
      // If there's an error, log the error
    })
    .catch((err) => {
      toastMessage("error", err.responseText);
    });
}
