"use strict";
var express = require("express");
var mongodb = require("mongodb");
var db_1 = require("../db");
var router = express.Router();
router.post('/', function (req, res) {
    var bookread = req.body;
    bookread._id = new mongodb.ObjectID(req.body._id);
    db_1.default.db.collection('booksread').save(req.body).then(function () {
        res.end();
    });
});
router.get('/:id', function (req, res) {
    var bookId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('booksread').findOne({ _id: bookId }).then(function (book) {
        res.json(book);
    });
});
router.get('/', function (req, res) {
    db_1.default.db.collection('booksread').find().toArray().then(function (booksread) {
        res.json(booksread);
    });
});
router.delete('/:id', function (req, res) {
    var bookreadID = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('booksread').remove({ _id: bookreadID }).then(function () {
        res.end();
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
