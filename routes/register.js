//Zihan Xu
import express from "express";
const router = express.Router();
import { register } from "../controller/register.js";
// import myDB from "../db/myDB.js";

router.post("/", register);
// router.post("/", (req, res) => {
//     myDB.createUser(user);
//   });
router.get("/", (req, res) => {
  res.status(200).redirect("..");
});

export default router;
