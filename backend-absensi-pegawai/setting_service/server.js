const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Setting Service For WFH Absence" });
});

// Sync for Sequelize
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize.sync();

// get routes
require("./app/routes/settingRoutes")(app);

// Set Port Listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
