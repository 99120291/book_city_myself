var gulp = require("gulp"),

    sass = require("gulp-sass"),

    Mincss = require("gulp-clean-css"),

    server = require("gulp-webserver"),

    querystring = require("querystring");

var mock = require("./mock");
var userList = [{
    username: 'bxs',
    pwd: '123',
    isLogin: false
}]
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
                if (req.url === "/login") {
                    var chunkArr = [];
                    req.on('data', function(chunk) {
                        chunkArr.push(chunk)
                    })
                    req.on('end', function() {
                        var params = querystring.parse(Buffer.concat(chunkArr).toString());
                        console.log(params.pwd);
                        var mask = false;
                        userList.forEach(function(item, index) {
                            if (item.username === params.username && item.pwd === params.pwd) {
                                item.isLogin = true;
                                mask = true;
                                res.end(JSON.stringify({ code: 1, msg: '登录成功' }))
                            }
                        })
                        if (!mask) {
                            res.end(JSON.stringify({ code: 2, msg: '登录失败' }))
                        }
                        next()
                    })
                    return false;
                } else if (req.url === '/isLogin') {
                    var chunkArr = [];
                    req.on('data', function(chunk) {
                        chunkArr.push(chunk)
                    })
                    req.on('end', function() {
                        var params = querystring.parse(Buffer.concat(chunkArr).toString());
                        console.log(params);
                        var mask = false;
                        userList.forEach(function(item, index) {
                            if (item.username === params.username) {
                                mask = true;
                                res.end(JSON.stringify({ code: 1, result: item.isLogin }))
                            }
                        })
                        if (!mask) {
                            res.end(JSON.stringify({ code: 2, msg: '请登录' }))
                        }
                        next()
                    })
                    return false;
                }


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