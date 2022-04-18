const express = require("express");
const cors = require("cors");
const app = express();
let corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome Employee Service." });
});

// ROUTES
require("./app/routes/division.routes")(app);
require("./app/routes/jobTitles.routes")(app);
require("./app/routes/employee.routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
