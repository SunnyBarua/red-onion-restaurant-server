const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const { MONGOURI } = require("./keys");
const User = require("./models/user");
const Food = require("./models/food");
app.use(cors());

const mongoose = require("mongoose");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting !", err);
});

const auth = require("./routes/auth");
const food = require("./routes/food");

app.use(express.json());
app.use(auth);
app.use(food);

app.listen(PORT, () => {
  console.log("App is running on", PORT);
});
