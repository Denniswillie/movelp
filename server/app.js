const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const inProduction = process.env.NODE_ENV === "production";
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect("mongodb+srv://admin-dennis:Firicis78910@movelpdb.8hxbz.mongodb.net/movelpDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

if (inProduction) {
  app.use(express.static('desktop-client/build'));
  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../desktop-client/build/index.html'))
  })
}

app.use(
  cors({
    origin: inProduction ? "https://fierce-temple-95150.herokuapp.com/" : "http://localhost:3000"
  })
);

app.get("/testRoute", (req, res) => {
  res.send("This is a reply from server");
  res.end();
});

app.listen(port, () => {
  console.log(`Server has started at ${port}`);
});
