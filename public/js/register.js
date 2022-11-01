//Zihan Xu
function Registration() {
  const form = document.getElementById("stripe-login2");
  const emailErr = document.querySelector("input[name='email']");
  const passwordErr = document.querySelector("input[name='password']");
  
  /**
 * function that checks if user email has already been used and passwords are matching
 * if everything is correct, creates user in the database
 */
  const isRegistered = async () => {
    try {
      const user = await fetch("./register", {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });
      const res = await user.json();
      console.log("res", res);
      //if there is registration error, show error
      if (res.error) {
        if (res.err === "email") {
          emailErr.classList.add("input_error");
          alert(`${res.error}, please try again with a different email`);
        } else if (res.err === "password") {
          passwordErr.classList.add("input_error");
          alert(res.error);
        }
      } else {
        //registration success, redirect to sign-in page
        alert(res.message);
        window.location.replace("/sign-in");
      }
    } catch (err) {
      alert(`There is an error ${err}`);
      console.error(err);
    }
  };
  //Need to set form event listener to submit and preventDefault
  if (form) {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      isRegistered();
    });
  }

  //password verification for the registration page to check if passwords are matching
  const checkPassword = () => {
    const val = {};
    const pass = document.querySelector("#password");
    const confirm = document.querySelector("#confirm");
    const check = document.querySelector(".verify");

    pass.addEventListener("input", (evt) => {
      let password = "";
      password += evt.target.value;
      if (evt.target.value === "") {
        alert("Please enter a valid password");
      }

      val.password = password;
      return val.password;
    });

    confirm.addEventListener("input", (evt) => {
      if (evt.target.value == val.password) {
        check.classList.add("verified");
        check.innerHTML = "match";
      } else {
        check.classList.add("verified");
        check.innerHTML = "passwords not matching";
      }
    });
  };
  checkPassword();
}

Registration();
