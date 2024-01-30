const express = require("express");
const connectDb = require("./config/connection");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const PORT = process.env.PORT || 3001;

connectDb.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
  });
});
