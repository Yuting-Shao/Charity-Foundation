//Yuting Shao
function Login() {
  const clientUser = {};
  let currUser = null;
  clientUser.currUser = currUser;

  const showMsg = (msg) => {
    alert(msg);
  };

  const redirect = (page) => {
    window.location.replace(`/${page}`);
  };

  clientUser.setupLogin = () => {
    console.log("setup login");
    const form = document.querySelector("form#stripe-login");
    let res;
    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("authenticating");
        authenticate(form);
      });
    }

    const authenticate = async (_form) => {
      try {
        res = await fetch("./sign-in", {
          method: "POST",
          body: new URLSearchParams(new FormData(_form)),
        });
        console.log("res.body", res.body);
        const resUser = await res.json();
        console.log("RES", resUser);
        //if user is logged in, redirect to main page
        if (resUser.isLoggedIn) {
        //this sets user in session
          clientUser.currUser = resUser.user;
          redirect("https://Project2Demo.hro1.repl.co");
        } else {
          showMsg(resUser.err);
        }
      } catch (err) {
        alert(`There is an error, ${err}`);
        console.error(err);
      }
    };
  };

  clientUser.setupLogout = () => {
    const logoutLink = document.getElementById("logout");
    // let res;
    if (logoutLink) {
      logoutLink.addEventListener("click", (evt) => {
        console.log("Logout event listener");
        evt.preventDefault();
        console.log("logout");
        logout();
      });
    }
    
    const logout = async () => {
      try {
        console.log("logging out");
        const res = await fetch("/sign-in/logout");
        const resLogout = await res.json();
        console.log("114");
        console.log("RESLOGOUT", resLogout.msg);
        showMsg(resLogout.msg);
        setTimeout(() => redirect("sign-in", 2000));
      } catch (err) {
        alert(`There is some error ${err}`);
        console.error(err);
      }
    };
  };
  clientUser.setupLogin();
  clientUser.setupLogout();

  return clientUser;
}
    
Login();
