const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//import fileUpload from "express-fileupload";

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
//app.use(fileUpload({}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// simple route
app.get("/", (req, res, next) => {
  let jsonResponce = {
    "handsetCards": [
      { imageName: 'offer1', title: 'Card 1', cols: 2, rows: 1 },
      { imageName: 'offer2', title: 'Card 2', cols: 2, rows: 1 },
      { imageName: 'offer3', title: 'Card 3', cols: 2, rows: 1 },
      { imageName: 'offer4', title: 'Card 4', cols: 2, rows: 1 }
    ],
    "webCards": [
      { imageName: 'offer1', title: 'Card 1', cols: 2, rows: 1 },
      { imageName: 'offer2', title: 'Card 2', cols: 1, rows: 1 },
      { imageName: 'offer3', title: 'Card 3', cols: 1, rows: 2 },
      { imageName: 'offer4', title: 'Card 4', cols: 1, rows: 1 }
    ]
  }
  res.json(jsonResponce);
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;

db.mongoose
  .connect(dbConfig.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}