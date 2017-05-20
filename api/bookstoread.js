"use strict";
var express = require("express");
var mongodb = require("mongodb");
var db_1 = require("../db");
var router = express.Router();
router.post('/', function (req, res) {
    var booktoread = req.body;
    booktoread._id = new mongodb.ObjectID(req.body._id);
    db_1.default.db.collection('bookstoread').save(req.body).then(function () {
        res.end();
    });
});
router.get('/:id', function (req, res) {
    var bookId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('bookstoread').findOne({ _id: bookId }).then(function (book) {
        res.json(book);
    });
});
router.get('/', function (req, res) {
    db_1.default.db.collection('bookstoread').find().toArray().then(function (bookstoread) {
        res.json(bookstoread);
    });
});
router.delete('/:id', function (req, res) {
    var booktoreadID = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('bookstoread').remove({ _id: booktoreadID }).then(function () {
        res.end();
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
