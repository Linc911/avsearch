var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/web2018");
var schEntity = require("../javabean/scheduler.js")
var Scheduler = mongoose.model("Scheduler", new mongoose.Schema(new schEntity({
    id: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    priorityId: {
        type: Number,
        require: true,
        default: 1
    },
    startDate: {
        type: String,
        require: true,
        // default:"2019-02-16 09:00:00"
    },
    endDate: {
        type: String,
        require: true,
        // default:1
    },
    description: {
        type: String,
    },
})))
exports.add = function (obj, callback) {
    new Scheduler(obj).save((err, data) => {
        callback(err, data)
    })
}
exports.removeByCond = function (condition, callback) {
    Scheduler.remove(condition, (err, data) => {
        callback(err, data)
    })
}
exports.removeById = function (id, callback) {
    Scheduler.findByIdAndRemove(id, (err, data) => {
        callback(err, data)
    })
}
exports.update = function (condition,newObj, callback) {
    Scheduler.update(condition,newObj, (err, data) => {
        callback(err, data)
    })
}

exports.find = function (obj, callback) {
    Scheduler.find(obj, (err, data) => {
        callback(err, data)
    })
}
exports.list = function (condition, callback) {
    Scheduler.find(condition, (err, data) => {
        callback(err, data)
    })
}