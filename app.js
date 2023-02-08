var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const db = require("./db/models/index");
const session = require("express-session");
global.__basedir = __dirname + "/ARISE1/..";
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express"),

 swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ARISE',
    version: '1.0.0',
    description:
      'List of all APIs.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

require("dotenv").config();

var app = express();

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "BJDaw0790)(Ujd",
    cookie: {},
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.set("Cache-Control", "private, no-cache, no-store, must-revalidate"); //means browser will not store data in cache(history) i.e when we press back or forward button in browser, it will not take us to previous page.
  next();
});

require("./routes")(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

db.sequelize.sync();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
