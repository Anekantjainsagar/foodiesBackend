const mongoose = require("mongoose");

const db =
  "mongodb+srv://Anekant:Anekant%401811@cluster0.8yg2s.mongodb.net/firstmern?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected successfully......");
  })
  .catch((err) => {
    console.log(err);
  });
