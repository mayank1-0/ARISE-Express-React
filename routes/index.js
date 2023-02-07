var fs = require("fs");

module.exports = function (app) {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file == "index.js") return;
    var name = file.substr(0, file.indexOf("."));
    // require("./" + name)(app);
    app.use(`/api/v1/${name}`, require(`./${name}`));
  });
};
