var gulp = require("gulp"),

    sass = require("gulp-sass"),

    Mincss = require("gulp-clean-css"),

    server = require("gulp-webserver"),

    querystring = require("querystring");

var mock = require("./mock");

gulp.task("css", function() {
    gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(Mincss())
        .pipe(gulp.dest("src/css"))
})

gulp.task("server", function() {
    gulp.src("src")
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                if (/\/api/g.test(req.url)) {
                    res.setHeader("content-type", "text/json;charset=utf-8")
                    var url = querystring.unescape(req.url);
                    var data = mock(url);
                    res.end(JSON.stringify(data))
                }
                next()
            }
        }))
})

gulp.task("watch", function() {
    gulp.watch("src/scss/**/*.scss", ["css"])
})

gulp.task("default", ["css", "server", "watch"])