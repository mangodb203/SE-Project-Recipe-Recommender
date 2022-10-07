const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//DB connections
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB CONNECTED!!");
});

// PORT
const port = process.env.PORT || 5000;

//Start server
app.listen(port, () => {
  console.log(`app is running on port ${port}...`);
});
