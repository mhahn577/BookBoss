"use strict";
var express = require("express");
var mongodb = require("mongodb");
var db_1 = require("../db");
var router = express.Router();
router.post('/', function (req, res) {
    var bookreading = req.body;
    bookreading._id = new mongodb.ObjectID(req.body._id);
    db_1.default.db.collection('booksreading').save(req.body).then(function () {
        res.end();
    });
});
router.get('/:id', function (req, res) {
    var bookId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('booksreading').findOne({ _id: bookId }).then(function (book) {
        res.json(book);
    });
});
router.get('/', function (req, res) {
    db_1.default.db.collection('booksreading').find().toArray().then(function (booksreading) {
        res.json(booksreading);
    });
});
router.delete('/:id', function (req, res) {
    var bookreadingID = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('booksreading').remove({ _id: bookreadingID }).then(function () {
        res.end();
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
