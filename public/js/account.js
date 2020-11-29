let avatar;
let userId;

// This request is used to figure out which user is logged in and update the HTML on the page
$.get("/api/user_data").then((data) => {
  console.log(data);
  $("#userName").text(data.name);
  $("#name-input").attr("placeholder", data.name);
  $("#email-input").attr("placeholder", data.email);
  if (data.avatar) {
    $(`#${data.avatar}`).prop("checked", true);
    avatar = $("input[name='avatar']:checked").val();
  }
  userId = data.id;
});

$(document).ready(() => {
  // Getting references to our form and input
  const editAccountForm = $("form.editAccount");
  const nameInput = $("input#name-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const confirmPassword = $("input#password-input2");

  // Declare needed functions
  const handleLoginErr = (err) => {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  };
  const validatePassword = (password, confirmPwd) => password === confirmPwd;

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  // Does a post to the update route. If successful, we are redirected to the chat page
  // Otherwise we log any errors
  const updateUser = (userData) => {
    $.ajax("/api/users", {
      type: "PUT",
      data: userData, // data to submit
      success: () => {
        $("#alert .msg").text("Profile updated!");
      },
      error: handleLoginErr,
    });
  };
  // When the signup button is clicked, we validate the email and password are not blank
  editAccountForm.on("submit", (event) => {
    event.preventDefault();
    const newAvatar = $("input[name='avatar']:checked").val();
    let userData = {};
    if (nameInput.val().trim() !== "") {
      userData.name = nameInput.val().trim();
    }
    if (emailInput.val().trim() !== "") {
      userData.email = emailInput.val().trim();
    }
    if (passwordInput) {
      if (validatePassword(passwordInput, confirmPassword)) {
        userData.password = passwordInput.val().trim();
      }
    }
    if (avatar !== newAvatar) {
      userData.avatar = newAvatar;
    }

    if (isEmpty(userData)) {
      return;
    }

    userData.id = userId;
    console.log(userData);
    // If we have any updated fields, run the updateUser function
    updateUser(userData);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    confirmPassword.val("");
  });
});
