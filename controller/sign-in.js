import myDB from "../db/myDB.js";

//Zihan Xu
export const authenticateUser = async (req, res) => {
  const user = req.body;
  console.log(user);

  const checkEmail = await myDB.authenticate(user);
  if (checkEmail) {
    //if authenticated, user in session
    req.session.user = { user: user.user };
    // res.status(200).json({ isLoggedIn: true, err: null, user: user.user });
    // window.location.assign("../");
    res.redirect("subindex.html");
  } else {
    res.status(403).json({
      isLoggedIn: false,
      err: "Wrong email ID or wrong pasword, please try again"
    });
  }
};

//function that logs out user
export const logOut = (req, res) => {
  req.session.user = null;
  console.log("session logout", req.session.user);
  res.json({ isLoggedIn: false, msg: "Logged out successfully" });
};
