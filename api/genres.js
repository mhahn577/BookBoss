"use strict";
var express = require("express");
var mongodb = require("mongodb");
var db_1 = require("../db");
var router = express.Router();
router.post('/', function (req, res) {
    var genre = req.body;
    genre._id = new mongodb.ObjectID(req.body._id);
    db_1.default.db.collection('genres').save(req.body).then(function () {
        res.end();
    });
});
router.get('/:id', function (req, res) {
    var genreId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('genres').findOne({ _id: genreId }).then(function (genre) {
        res.json(genre);
    });
});
router.get('/', function (req, res) {
    db_1.default.db.collection('genres').find().toArray().then(function (genres) {
        res.json(genres);
    });
});
router.delete('/:id', function (req, res) {
    var genreID = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('genres').remove({ _id: genreID }).then(function () {
        res.end();
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
