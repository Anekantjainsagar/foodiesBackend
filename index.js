const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

app.use(cors());
//Database connection
dotenv.config({ path: `./config.env` });

const port = 5000;
require("./db/conn");
// const User = require(`./model/userSchema`)

app.use(express.json());
app.use(require(`./Router/auth.js`));

app.listen(port, () => {
  console.log(`server is running on port ${port}....`);
});
