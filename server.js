const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var databaseToUse = "";

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  databaseToUse =
  // need to create mongo db via heroku
    "mongodb://<username>:<password>@ds163757.mlab.com:63757/heroku_36zj5n7k";
} else {
  databaseToUse = "mongodb://localhost/reactBoilerplates";
}

app.use(routes);

const MONGODB_URI = process.env.MONGODB_URI || databaseToUse;

mongoose.Promise = global.Promise;

mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});
