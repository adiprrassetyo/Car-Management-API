const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();
const { sequelize: db } = require("./models/index.js");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());
const router = require("./routes/routes");
app.use(router);

app.get('/', (req, res) => {
  res.send('welcome to my Cars API !')
})

const PORT = process.env.PORT || 3000;
try {
  db.authenticate();
  console.info("DB authenticate successfully");
  app.listen(PORT, () => {
    console.info(`Server allready listening for request on port ${PORT}...`);
  });
} catch (e) {
  console.error(e);
}
