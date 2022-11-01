import myDB from "../db/myDB.js";
//Yuting Shao
export const register = async (req, res) => {
  let user;
  let checker;
  try {
    user = req.body;
    checker = await myDB.getUser(user.email);
    console.log("Checker", user, checker);
    if (
      user.email != undefined &&
      checker === null &&
      user.password === user.confirm_password
    ) {
      await myDB.createUser(user);
      res
        .status(201)
        .json({ message: "Registration successful! Please sign-in" });
    } else {
      if (user.password !== user.confirm_password) {
        res.json({
          error: "Passwords not matching",
          err: "password" + user.confirm_password + "confirm: " + user.password
        });
      } else if (user.email === checker.email) {
        res.json({ error: "User email already exists", err: "email" });
      }
    }
  } catch (err) {
    //Todo: show error in frontend
    console.error("error", err);
    res.status(400).send({ err: err });
  }
};

export const userSession = (req, res) => {
  res.json({ user: req.session.user });
};
