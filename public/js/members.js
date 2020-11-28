// This request is used to figure out which user is logged in and update the HTML on the page
$.get("/api/user_data").then((data) => {
  console.log(data);
  const rightNav = data.email
    ? `
        <li class="btn btn-outline-main rounded-pill">
            <a href="/logout">
            Logout
            </a>
        </li>
        <li class="btn btn-outline-main rounded-pill">
            <a href="/account">
            ${data.name}
            </a>
        </li>
        `
    : `
        <li class="btn btn-outline-main rounded-pill">
          <a href="/login">Log In</a>
        </li>
        <li class="btn btn-main rounded-pill">
          <a href="/signup">Sign Up</a>
        </li>
        `;
  $("#rightNav").html(rightNav);
});
