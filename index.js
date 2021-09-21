const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const createCheckoutSession = require("./api//checkout");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: true }));

app.get("/", (req, res) => res.send("Hello from the backend"));
app.post("/create-checkout-session", createCheckoutSession);

app.listen(port, () => {
  console.log("server listing on port", port);
});
