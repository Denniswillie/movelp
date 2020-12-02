const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

if (process.env.NODE_ENV === "production") {
  app.use(express.static('desktop-client/build'));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../desktop-client/build/index.html'))
  })
}

mongoose.connect("mongodb+srv://admin-dennis:Firicis78910@movelpdb.8hxbz.mongodb.net/movelpDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

app.use(cors());

app.get("/testRoute", (req, res) => {
  console.log("Caught request from client");
  res.end();
});

app.listen(port, () => {
  console.log(`Server has started at ${port}`);
});
