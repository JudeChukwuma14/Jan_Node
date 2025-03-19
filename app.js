const express = require("express");
const app = express();
require("dotenv").config();
const expresshbs = require("express-handlebars");
const userRouter = require("./routes/getUserRouter");
const mongoose = require("mongoose");
const postRouter = require("./routes/postUserRouter")
const authRouter = require("./routes/authRouter")
const paymentRouter = require("./routes/paymentRouter")
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const MONGODB = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("Data base connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });
app.engine(
  "hbs",
  expresshbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.use(express.static("public"));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get("/blog/:id", (req, res) => {
//   const userName = req.params.id;
//   res.send(`<h1>Hello,  ${userName}, \n How are you doing?</h1>`);
// });

app.use("/", userRouter);
app.use("/",postRouter)
app.use("/",authRouter)
app.use("/",paymentRouter)
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
