//Yuting Shao
import express from "express";
import { authenticateUser, logOut } from "../controller/sign-in.js";
let router = express.Router();

router.get("/getUser", (req, res) => {
  console.log("getUser", req.session);
  res.json({
    isLoggedIn: !!req.session.user,
    user: req.session.user
  });
});

router.post("/", authenticateUser);

// Returns the posts for the current logged in user
router.get("/getPosts", async (req, res) => {
  if (!req.session.user) {
    return res.json({
      isLoggedIn: false,
      err: "Not authenticated please log in"
    });
  }
  return res.json({ isLoggedIn: true });
});

router.get("/logout", logOut);

router.get("/", (req, res) => {
  res.status(200).redirect("/");
});

export default router;
