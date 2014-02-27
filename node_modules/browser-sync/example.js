var browserSync = require("./lib/index");
var files = ["test/fixtures/**/*.css", "test/fixtures/**/*.html"];
var bs = browserSync.init(files, {
    server: {
        baseDir: "test/fixtures",
        middleware: [function (req, res, next) {
            console.log("moddiel");
            next()
        }]
    }
});