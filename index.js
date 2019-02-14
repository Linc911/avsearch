var express = require("express");
var path = require("path");
var session = require("express-session");
// var router = require("./router.js");
var uploadRouter = require("./routers/upload.js");
var userRouter = require("./routers/user.js");
var sessionRouter = require("./routers/session.js");
var gmTest = require("./routers/gm-test.js");
var scheduler = require("./routers/scheduler.js");
var app = express();
app.listen("8001", function () {
    console.log("服务器开启")
})
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// console.log(path.join(__dirname,"../09-pure-webpack02/src/"))
app.use("/static", express.static(path.join(__dirname, "./dist/")))
// app.use(express.static(path.join(__dirname,"./src/")))
app.use(session({
    secret: "hwn",
    resave: false,
    saveUninitialized: true,
    useNewUrlParser: true
}))
// app.use("/user",router);
app.use("/upload", uploadRouter);
app.use("/user", userRouter);
app.use("/session", sessionRouter);
app.use("/gm", gmTest);
app.use("/scheduler", scheduler);
app.use((req, res) => {
    res.send("404")
})
app.use((err, req, res, next) => {
    res.status(500).json({
        code: 500,
        msg: "服务器出错"
    })
})