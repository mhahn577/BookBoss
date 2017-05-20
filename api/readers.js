"use strict";
var express = require("express");
var mongodb = require("mongodb");
var db_1 = require("../db");
var router = express.Router();
router.post('/', function (req, res) {
    var reader = req.body;
    reader._id = new mongodb.ObjectID(req.body._id);
    db_1.default.db.collection('readers').save(req.body).then(function () {
        res.end();
    });
});
router.get('/:id', function (req, res) {
    var readerId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('readers').findOne({ _id: readerId }).then(function (reader) {
        res.json(reader);
    });
});
router.get('/', function (req, res) {
    db_1.default.db.collection('readers').find().toArray().then(function (readers) {
        res.json(readers);
    });
});
router.delete('/:id', function (req, res) {
    var readerID = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('readers').remove({ _id: readerID }).then(function () {
        res.end();
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
