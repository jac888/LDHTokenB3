const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("public"));
app.use(express.static("build"));
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
app.set("port", process.env.PORT || 2000);
var server = app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + server.address().port);
});
