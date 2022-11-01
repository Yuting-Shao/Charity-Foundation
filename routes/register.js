//Zihan Xu
import express from "express";
const router = express.Router();
import { register } from "../controller/register.js";


router.post("/", register);

router.get("/", (req, res) => {
  res.status(200).redirect("..");
});

export default router;
