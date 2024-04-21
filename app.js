const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const denikController = require("./controller/denik");
const denikEntryController = require("./controller/denikEntry");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/denik", denikController);
app.use("/denikEntry", denikEntryController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
