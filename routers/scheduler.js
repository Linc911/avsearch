var express = require("express");
var _ = require("lodash");
var scheduler = require("../models/scheduler.js");
var router = express.Router();

router.all("/add", function (req, res, next) {
    //   const secret =  "hwn";
    // const hash = crypto.createHmac('sha256', secret).digest('hex');
    console.log(req.query)
    scheduler.add(req.query, (err, data) => {
        if (err) {
            next(err)
        } else {
            res.send(JSON.stringify({
                data: data,
            }))
        }

    })
});
router.all("/remove", function (req, res) {
    scheduler.removeByCond(req.query, (err, data) => {
        res.send(JSON.stringify({
            data: data,
        }))
    })
});
router.all("/clear", function (req, res) {
    scheduler.removeByCond({}, (err, data) => {
        res.send(JSON.stringify({
            data: data,
        }))
    })
});
router.all("/removeById", function (req, res) {
    console.log(req.query._id)
    scheduler.removeByCond({_id:req.query._id}, (err, data) => {
        res.send(JSON.stringify({
            data: data,
        }))
    })
});
router.all("/update", function (req, res) {
    scheduler.update(req.query.condition,req.query.newObj, (err, data) => {
        res.send(JSON.stringify({
            data: data,
        }))
    })
});
router.all("/list", function (req, res) {
    scheduler.list({}, (err, data) => {
        res.send(JSON.stringify({
            data: data,
        }))
    })
});
module.exports = router;