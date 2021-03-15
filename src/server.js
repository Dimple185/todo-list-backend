const mongoose = require("mongoose");
const express = require("express");
const env = require("dotenv");
const cors = require('cors')
const port = 8000;

//creating an express app
const app = express();

//routes
const userRouter = require("./routes/user");


//envirornmental variable
env.config();

//mongodb Connection
mongoose
  .connect(
    `mongodb+srv://dimple1234:dimple1234@cluster0.srpfh.mongodb.net/Redux-todos?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(cors())
app.use(express.json());
app.use("/api", userRouter);



//listen on a server
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
