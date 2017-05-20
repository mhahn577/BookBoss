"use strict";
var express = require("express");
var mongodb = require("mongodb");
var db_1 = require("../db");
var router = express.Router();
router.post('/', function (req, res) {
    var book = req.body;
    book._id = new mongodb.ObjectID(req.body._id);
    db_1.default.db.collection('books').save(req.body).then(function () {
        res.end();
    });
});
router.get('/', function (req, res) {
    db_1.default.db.collection('books').find().toArray().then(function (books) {
        res.json(books);
    });
});
router.delete('/:id', function (req, res) {
    var bookID = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('books').remove({ _id: bookID }).then(function () {
        res.end();
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
