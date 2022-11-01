import express from "express";
import path from "path";
import register from "./routes/register.js";
import signIn from "./routes/sign-in.js";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  session({
    secret: "Johns new venture",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./public"));

app.use("/register", register);
app.use("/signin", signIn);

app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/public/404.html"));
});

export default app;
